import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema(
{
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  

}, { timestamps: true }
);
export const transactionModel = mongoose.model("Transaction", transactionSchema);
