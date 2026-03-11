import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/transactionRoutes.js";
import route from "./routes/userRoutes.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: "*", // Allow all origins for now so the deployed frontend can connect. You can restrict this to your Vercel URL later.
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", router);
app.use("/api", route);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "FinTech API is running!" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || "Something went wrong!",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

const mongo_URI = process.env.MongoDb_URI;
const port = process.env.PORT || 5000;

mongoose.connect(mongo_URI)
    .then(() => {
        console.log(" MongoDB Connected Successfully");
        app.listen(port, () => {
            console.log(` Server running on http://localhost:${port}`);
        });
    })
    .catch((e) => {
        console.error("MongoDB connection Failed!", e);
        process.exit(1);
    });
