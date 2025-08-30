import { userModel } from "../models/userModel.js"
import {hash, compare} from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
const jwt = jsonwebtoken

export async function createUser(req, res){
    try{
      console.log(req.body)
        const {username, email, password} = req.body
    
        const hashedPassword = await hash(password,10)   //Hashing with 10 salts
        // Here you would typically save the user to a database
        // For now, we will just return the hashed password
        const userDetails = await userModel.findOne({username})  
        if(userDetails !=  null){
            return res.status(400).json({error:"User already exists"})
        }
        const user = await userModel.create({username, email, password:hashedPassword})
        res.status(200).json({user})
        
    }catch(e){
    
        console.error(e)
        res.status(500).json({error:"Something went wrong"})
        
    }
    
}

export async function loginUser(req, res){
    try{
        const {username, email, password} = req.body

        const userDetails = await userModel.findOne({username})
        console.log(userDetails)  
        if(userDetails != null){
          console.log(userDetails)
            const isPasswordValid = await compare(password, userDetails.password)
            if (!isPasswordValid){
                return res.status(400).json({error:"Invalid Password"})
             } const payload = {
                    username,
                    email,
                    password
                }            
                const jwtToken = jwt.sign(payload, process.env.JWT_SECRET)
            
                res.status(200).json({jwtToken})
            
        }else{
            return res.status(400).json({error:"Please register first"})
        }

    }catch(e){
        console.error(e)
        res.status(500).json({error:"Something went wrong"})
    }
}