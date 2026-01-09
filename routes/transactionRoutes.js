import { Router } from "express";
import {
    createTransaction,
    getTransactions,
    getUserTransactions,
    getTransactionStats,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from "../controller/transactionController.js";
import express from "express";
import { validation } from "../middlewares/validation.js";
const router = express.Router();

router.post("/transactions", validation, createTransaction);  // Add new transaction
router.get("/transactions", validation, getTransactions);     // Fetch all transactions
router.get("/transactions/user/:userId", validation, getUserTransactions); // Get user transactions
router.get("/transactions/stats/:userId", validation, getTransactionStats); // Get user stats
router.get("/transactions/:id", validation, getTransactionById);
router.put("/transactions/:id", validation, updateTransaction);
router.delete("/transactions/:id", validation, deleteTransaction);

export default router;
