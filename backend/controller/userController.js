import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import validator from 'validator'
import userModel from "../model/userModel.js"
import jwt from 'jsonwebtoken'
import nodemailer, { createTransport } from 'nodemailer'
const createToken = ({id})=> {
    return jwt.sign(id,process.env.JWT_SECRET)
}
const registerUser =async (req,res)=> {
   try {
    const {name,email,password} = req.body
    const exist =await userModel.findOne({email})
    if(exist) {
       return res.json({success:false,message:"Email existed"})
    }
    if(!validator.isEmail(email)) {
        return res.json({success:false,message:"Invalid Email"})
    }
    if(password.length < 6) {
        return res.json({success:false,message:"Please password Strong"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password,salt)
    const newUser = new userModel({
        name,
        email,
        password:hashedPassword
    })
   const user = await newUser.save()
   const token = createToken(user._id)
    return res.json({success:true,token})
   } catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
   }
}
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
           return res.json({success:false,message:"Invalid Credential"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch) {
            const token = createToken(user._id)
            return res.json({success:true,token,user})
        }
        else {
            return res.json({success:false,message:"Email or Password Incorrect!!!"})
        }
    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const loginAdmin = async(req,res)=> {
    try {
        const {email,password} = req.body
            if(email === process.env.EMAIL && password ===process.env.PASSWORD) {
                const token = jwt.sign(email+password,process.env.JWT_SECRET)
                return res.json({success:true,token})
            } else {
                return res.json({success:false,message:"Invalid Credential"})
            }
    } catch(error) {
        console.log(error)
        return res.json({success:true,meesage:error.meesage})
    }
}
const getUsers = async (req, res) => {
    try {
        // Include the password field in the query results
        const users = await userModel.find({});
        return res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
const updateUser = async (req,res) => {
    try {
        const {id,name,email} = req.body
        console.log(req.body)
        const user = await userModel.findById(id);
        if(!user) {{
            return res.json({success:false,message:"ID NOT FOUND"})
        }}
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Email invalid"})
        }
        user.name = name
        user.email = email
        await user.save()
        return res.json({success:true,message:user})
    }
    catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
const deleteUser = async(req,res) => {
    try {
        const {id} = req.body
        const user = await userModel.findByIdAndDelete(id)
        if(!user) {
            return res.json({success:false,message:"Id Not Found"})
        }
        return res.json({success:true,message:"User deleted"})
    }
    catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
     const forgetPassword = async(req,res) => {
        try {
            const { email } = req.body
            const checkEmail = await userModel.findOne({email})
            if(!checkEmail) {{
                return res.json({success:false,message:"User not Found "})
            }}
            const token = jwt.sign({email},process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
            
            const transporter = nodemailer.createTransport({
                service: "gmail",
                secure:true,
                auth: {
                    user:process.env.MY_GMAIL,
                    pass:process.env.MY_PASSWORD
                }
            })
            const receiver = {
                from:process.env.MY_GMAIL,
                to:email,
                subject:"Password reset require",
                text:`Reset your password folow this line in 1h ${process.env.CLIENT_URL}/resetpass/${token}`
            }         
                
            await  transporter.sendMail(receiver)
            return res.json({success:true,message:"Check your email to reset password in 1h"})
        } catch(error) {
            console.log(error)
            return res.json({success:false,message:error.message})
        }
     }
     const resetPassword = async(req,res) => {
            try {
                const {token}  = req.params
                const { password } = req.body
                if(!password) {
                    return res.json({success:false,message:"Please enter new password!!!!"})
                }
                const decode = jwt.verify(token,process.env.JWT_SECRET)
                const user = await userModel.findOne({email:decode.email})
                if(!user) {
                    return res.json({success:false,message:"Token is wrong"})
                } 
                const salt = await bcrypt.genSalt(10)
                const hashedPass = await bcrypt.hash(password,salt)
                user.password = hashedPass
                await user.save()
                return res.json({success:true,message:"Reset Pass Successful",})
            }catch(error) {
                console.log(error)
                return res.json({success:false,message:error.message})
            }
     }
   
export {registerUser,loginUser,loginAdmin,getUsers,updateUser,deleteUser,forgetPassword,resetPassword}