import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientName: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

export default Client;
