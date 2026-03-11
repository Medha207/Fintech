import { transactionModel } from "../models/transactionModel.js";
import { userModel } from "../models/userModel.js";

// Create new transaction
export async function createTransaction(req, res) {
  try {
    const { userId, amount, type, category, description } = req.body;

    // Validation
    if (!userId || !amount || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check balance for debit transactions
    if (type === "debit" && user.walletBalance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Create transaction
    const transaction = new transactionModel({
      userId,
      amount,
      type,
      category: category || "Other",
      description: description || ""
    });
    await transaction.save();

    // Update wallet balance
    if (type === "credit") {
      user.walletBalance += amount;
    } else if (type === "debit") {
      user.walletBalance -= amount;
    }

    await user.save();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction,
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    console.error("Create transaction error:", error);
    res.status(500).json({ error: error.message });
  }
}

// Get all transactions (admin only - for now returns all)
export async function getTransactions(req, res) {
  try {
    const transactions = await transactionModel.find()
      .sort({ createdAt: -1 })
      .limit(100);
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get transactions for a specific user
export async function getUserTransactions(req, res) {
  try {
    const { userId } = req.params;
    const { type, category, startDate, endDate } = req.query;

    // Build filter
    const filter = { userId };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const transactions = await transactionModel.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Get user transactions error:", error);
    res.status(500).json({ error: error.message });
  }
}

// Get transaction statistics for a user
export async function getTransactionStats(req, res) {
  try {
    const { userId } = req.params;

    const transactions = await transactionModel.find({ userId });

    const stats = {
      totalIncome: 0,
      totalExpense: 0,
      totalTransactions: transactions.length,
      categoryBreakdown: {},
      monthlyData: {}
    };

    transactions.forEach(tx => {
      if (tx.type === "credit") {
        stats.totalIncome += tx.amount;
      } else {
        stats.totalExpense += tx.amount;
      }

      // Category breakdown
      if (!stats.categoryBreakdown[tx.category]) {
        stats.categoryBreakdown[tx.category] = 0;
      }
      stats.categoryBreakdown[tx.category] += tx.amount;

      // Monthly data
      const month = new Date(tx.createdAt).toLocaleString("default", { month: "short" });
      if (!stats.monthlyData[month]) {
        stats.monthlyData[month] = { income: 0, expense: 0 };
      }
      if (tx.type === "credit") {
        stats.monthlyData[month].income += tx.amount;
      } else {
        stats.monthlyData[month].expense += tx.amount;
      }
    });

    stats.balance = stats.totalIncome - stats.totalExpense;

    res.status(200).json({ stats });
  } catch (error) {
    console.error("Get transaction stats error:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getTransactionById(req, res) {
  try {
    const { id } = req.params;
    const transaction = await transactionModel.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update transaction
export async function updateTransaction(req, res) {
  try {
    // We need to fetch the original transaction first to revert its balance effect
    const originalTransaction = await transactionModel.findById(req.params.id);
    if (!originalTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const transaction = await transactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // If amount or type changed, update wallet balance
    if (req.body.amount !== undefined || req.body.type !== undefined) {
      const user = await userModel.findById(transaction.userId);
      if (user) {
        // Revert old transaction
        if (originalTransaction.type === "credit") {
          user.walletBalance -= originalTransaction.amount;
        } else if (originalTransaction.type === "debit") {
          user.walletBalance += originalTransaction.amount;
        }

        // Apply new transaction
        if (transaction.type === "credit") {
          user.walletBalance += transaction.amount;
        } else if (transaction.type === "debit") {
          user.walletBalance -= transaction.amount;
        }

        await user.save();
      }
    }

    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete transaction
export async function deleteTransaction(req, res) {
  try {
    const transaction = await transactionModel.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Recover wallet balance
    const user = await userModel.findById(transaction.userId);
    if (user) {
      if (transaction.type === "credit") {
        user.walletBalance -= transaction.amount;
      } else if (transaction.type === "debit") {
        user.walletBalance += transaction.amount;
      }
      await user.save();
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
