import User from "../models/user.js";
import { sendResetPassEmail, sendWelcomeEmail } from "../services/mailer.js";
import { generateToken } from "../utils/jwt.js";
import { otpGenerator, otpVerify } from "../utils/otpHandler.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user_username = await User.findOne({ username });
    if (user_username) {
      return res
        .status(409)
        .json({ success: false, message: "Username already taken" });
    }

    const user_email = await User.findOne({ email });
    if (user_email) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

    sendWelcomeEmail(newUser.email, newUser.username).catch((err) =>
      console.error("Failed to send welcome email:", err)
    );
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged-in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res
    .status(200)
    .json({ success: true, message: "User logged-out successfully" });
};

const generateOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = await otpGenerator(user._id);
    await sendResetPassEmail(user.email, user.username, otp);

    res.status(200).json({ success: true, message: "OTP send to email" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isValid = await otpVerify(user._id, otp);
    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid Otp" });
    }

    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset was successfull" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { register, login, getUser, logout, generateOtp, resetPassword };
