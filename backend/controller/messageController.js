import userModel from "../model/userModel.js"
import messageModel from "../model/messageModel.js"
import { v2 as cloudinary } from 'cloudinary'
import {io} from '../server.js'
const sendMessage = async(req,res) => {
    try {
        const { isUserSend,userEmail, userName, text, image  } = req.body
      
        console.log(image)
        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
        } 
        console.log(imageUrl)
        
        const user = await userModel.findOne({email:userEmail})
        if(!user) {
           return res.json({success:false,message:"Not user found"})
        }
        if(text === '') {
            return res.json({success:false,message:"Please enter something to chat "})
        }
        const newMessage = new messageModel ( { 
            isUserSend,
            userEmail,
            userName,
            text,
            image:imageUrl
        })
        const msg = await newMessage.save()
        io.emit('newMsg',msg)
        return res.json({success:true,message:"Added msg",msg})
    } catch(error) {
        console.log(error) 
        return res.json({success:false,message:error})
    }
}
const getMessage = async(req,res) => {
    try {
        const { userEmail } = req.body
        console.log(userEmail)
        const user = await userModel.findOne({email:userEmail})
        if(!user) {
            return res.json({success:false,message:"Not user found"})
        }
        const listMsg = await messageModel.find({ userEmail })
        return res.json({success:true,message:"Get msg succes",listMsg})

    } catch(error) {
        console.log(error)
        return res.json({success:false,message:error})
    }
}
export {sendMessage,getMessage}