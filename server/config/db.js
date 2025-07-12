import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB connected");
  } catch (error) {
    console.log("Database connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
