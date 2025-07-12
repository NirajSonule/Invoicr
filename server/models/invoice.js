import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const InvoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    items: {
      type: [ItemSchema],
      required: true,
    },
    taxRate: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
