import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/transactionRoutes.js";
import router_2 from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", router)
app.use("/api", router_2)

const mongo_URI = process.env.MongoDb_URI
const port = process.env.PORT

mongoose.connect(mongo_URI)
    .then(()=>{
        console.log("MongoDb Connected Successfully")
        app.listen(port,()=>{
            console.log("Server Started")
        })
    })
    .catch((e)=>{
        console.error("MongoDB connection Failed!",e)
    })
