import { randomInt } from "crypto";
import Otp from "../models/otp.js";

const otpGenerator = async (userId) => {
  const otp = randomInt(100000, 1000000).toString();

  await Otp.deleteMany({ userId });

  const otpDoc = new Otp({ userId, otp });
  await otpDoc.save();

  return otp;
};

const otpVerify = async (userId, inputOtp) => {
  const record = await Otp.findOne({ userId, otp: inputOtp });
  if (!record) return false;

  await Otp.deleteOne({ _id: record._id });
  return true;
};

export { otpGenerator, otpVerify };
