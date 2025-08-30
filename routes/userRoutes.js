import { Router } from "express";
import {createUser,loginUser} from "../controller/userController.js";
import express from "express";
import { validation } from "../middlewares/validation.js";
const router_2 = express.Router();

router_2.post("/register", createUser)
router_2.post("/login",loginUser)


export default router_2;