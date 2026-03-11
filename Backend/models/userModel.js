import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true
        },
        walletBalance: {
            type: Number,
            default: 0, // every user starts with 0 balance
        },
    }, { timestamps: true }

);

export const userModel = mongoose.model("User", userSchema);

//export default userModeler;