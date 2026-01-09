import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "Amount must be greater than 0"]
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Salary", "Food", "Transport", "Rent", "Shopping", "Entertainment", "Bills", "Healthcare", "Education", "Investment", "Other"],
      default: "Other"
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"]
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success",
    }
  }, { timestamps: true }
);

// Index for faster queries
transactionSchema.index({ userId: 1, createdAt: -1 });

export const transactionModel = mongoose.model("Transaction", transactionSchema);
