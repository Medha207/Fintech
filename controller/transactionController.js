
import { transactionModel } from "../models/transactionModel.js"


// Create new transaction
export async function createTransaction(req, res) {
  try {
    const { userId, amount, type } = req.body;
    const transaction = new transactionModel({ userId, amount, type });
    await transaction.save();
    res.status(200).json({ message: "Transaction Successful", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all transactions
export async function getTransactions(req, res){
  console.log("Hello")
  try {
    const transactions = await transactionModel.find();
    res.status(200).json({transactions:transactions});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
export async function getTransactionById(req, res){
  try {
    const {id} = req.params
    const transaction = await transactionModel.findById(id);
    if (!transaction){
        return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update transaction
export async function updateTransaction(req, res){
  try {
    const transaction = await transactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!transaction){
        return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete transaction
export async function deleteTransaction(req, res){
  try {
    const transaction = await transactionModel.findByIdAndDelete(req.params.id);
    if (!transaction){
        return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
