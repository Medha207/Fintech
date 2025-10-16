import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/transactionRoutes.js";
import route from "./routes/userRoutes.js";
import cors from "cors";


dotenv.config();
const app = express();

app.use(cors({ origin: "*", credentials: false, methods: "GET,PUT,POST,DELETE" }));
app.use(express.json());

app.use("/api", router)
app.use("/api", route)

const mongo_URI = process.env.MongoDb_URI
const port = process.env.PORT

mongoose.connect(process.env.MongoDb_URI)
    .then(()=>{
        console.log("MongoDb Connected Successfully")
        app.listen(port,()=>{
            console.log("Server Started")
        })
    })
    .catch((e)=>{
        console.error("MongoDB connection Failed!",e)
    })
