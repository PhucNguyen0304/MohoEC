import imagesArticleModel from '../model/imagesArticle.js'
import mongoose from 'mongoose'
import connectDB from '../config/mongoose.js'
await connectDB()
import { v2 as cloudinary } from 'cloudinary'
const uploadImage = async (req,res) => {
    try {
        const {image,note} = req.body
        let imageUrl = ''
        if(image) {
            const result = await cloudinary.uploader.upload(image)
            imageUrl = result.secure_url
        }
        const newImage = new imagesArticleModel({url:imageUrl,note})
        await newImage.save()
        return res.json({success:true,message:'Image uploaded successfully'})
    }catch(error) {
        console.log(error)
        return res.json({success:false,message:error})
    }
}
const getImage = async (req,res) => {
    try {
        const images = await imagesArticleModel.find({}).sort({ createdAt: -1 }) // Sort by newest first
        .exec();
        return res.json({success:true,images})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error})
}}
const getArticleDetails = async (req,res) => {
    try {
        const collection = mongoose.connection.collection('articles');
        const articles = await collection.find().toArray();
    return res.json({success:true,articles})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error})

    }
}

export { uploadImage, getImage, getArticleDetails }
