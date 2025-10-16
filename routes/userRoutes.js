import { Router } from "express";
import {createUser,loginUser, getWalletBalance} from "../controller/userController.js";
import express from "express";
import { validation } from "../middlewares/validation.js";
const route = express.Router();

route.post("/register", createUser)
route.post("/login",loginUser)
route.get("/wallet/:userId", getWalletBalance)


export default route;