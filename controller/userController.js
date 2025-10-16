import { userModel } from "../models/userModel.js"
import {hash, compare} from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import { transactionModel } from "../models/transactionModel.js"
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
             }  const payload = {
                    id: userDetails._id, username: userDetails.username }
                const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
            
                res.status(200).json({jwtToken , user: { id: userDetails._id, username: userDetails.username, email: userDetails.email } });
            
        }else{
            return res.status(400).json({error:"Please register first"})
        }

    }catch(e){
        console.error(e)
        res.status(500).json({error:"Something went wrong"})
    }
}

// export async function getWalletBalance(req, res) {
//   try {
//     const transactions = await transactionModel.find({ userId: req.params.userId });
    
//     let balance = 0;
//     transactions.forEach(tx => {
//       if (tx.type === "credit") balance += tx.amount;
//       if (tx.type === "debit") balance -= tx.amount;
//     });

//     res.status(200).json({ balance });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export async function getWalletBalance(req, res) {
  try {
    const user = await userModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ balance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

