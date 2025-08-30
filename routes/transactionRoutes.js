import { Router } from "express";
import { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction} from "../controller/transactionController.js";
import express from "express";
import { validation } from "../middlewares/validation.js";
const router = express.Router();

router.post("/transactions", createTransaction);  // Add new transaction
router.get("/transactions", getTransactions);     // Fetch all transactions
router.get("/transactions/:id", getTransactionById);
router.put("/transactions/:id",updateTransaction);
router.delete("/transactions/:id",deleteTransaction);


export default router;
