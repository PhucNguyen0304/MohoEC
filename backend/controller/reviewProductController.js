import userModel from "../model/userModel.js";
import productModel from "../model/productModel.js";
import reviewProductModel from "../model/reviewProductModle.js";
import { v2 as cloudinary } from 'cloudinary'
const sendReview = async(req,res) => {
    try {
        const {idProduct, emailUser,nameUser,text,image}  = req.body
        let imageUrl;
        if(image) {
            console.log("Have Image")
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        console.log(imageUrl)
        if(!image) {
            console.log("No image")
        }
        const productReview =await productModel.findById(idProduct)
        if(!productReview) {
            return res.json({success:false,message:"Product Not Found"})
        }
        const user = await userModel.findOne({email:emailUser}) 
        if(!user) {
            return res.json({success:false,message:"User Not found"})
        }
        const newReview = new reviewProductModel({
            idProduct,
            emailUser,
            nameUser,
            text,
            image:imageUrl
        })
        const review = await newReview.save()
        return res.json({success:true,message:"Added review",review})
    }catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const getReview = async(req,res) => {
    try {
        const {idProduct} = req.params
        const listReview = await reviewProductModel.find({idProduct})
        if(listReview) {
            return res.json({success:true,message:"Get list Review Success",listReview})
        }
    }catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export {sendReview,getReview}