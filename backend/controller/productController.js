import productModel from "../model/productModel.js"
import {v2 as cloudinary} from 'cloudinary'
const addProduct = async(req,res) => {
    try {
        const {name,price,color,category,subCategory,bestSeller,description,news} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const images = [image1,image2,image3,image4].filter((item) =>item !== undefined)
        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        const formData = {
            name,
            price:Number(price),
            color:JSON.parse(color),
            category,
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            description,
            new:news === 'true' ? true : false,
            image:imageUrl
        }
        const newProduct = new productModel(formData)
        await newProduct.save()
        return res.json({success:true,message:"Added Product SuccessFully!!!",newProduct})
    } 
    catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
const updateProduct = async (req,res)=> {
    try {
        const {name,price,color,category,subCategory,bestSeller,description,news,id} = req.body
        console.log(req.body)
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    const images = [image1,image2,image3,image4].filter((image)=> image !== undefined)
    const imagesURL = await Promise.all(
        images.map(async(item)=> {
            let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
            return result.secure_url
        })
    )
    const updateProduct = {
        name,
        price:Number(price),
        color:JSON.parse(color),
        category,
        subCategory,
        bestSeller:bestSeller==="true"?true:false,
        description,
        new:news==="true"?true:false
    }      
    const updatedProduct =await productModel.findByIdAndUpdate(
        id,
        {$set:updateProduct},
        {new:true}
    )        
    if(!updateProduct) {
        return res.json({success:false,message:"Product not found"})
    }
    return res.json({success:true,message:"Product Update",product:updatedProduct})
    } catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
const listProduct = async(req,res)=> {
   try {
    const products = await productModel.find({})
    return res.json({success:true,products:products})
   } catch(error) {
    console.log(error)
    return res.json({success:false,message:error.message})
   }
}
 const  deleteProduct = async (req,res) => {
    try {
        const {id} = req.body
        const deletedProduct = await productModel.findByIdAndDelete(id)
        if(!deletedProduct) {
            return res.json({success:false,message:"ID NOT FOUND"})
        }
        else {
           return res.json({success:true,message:"Product Removed"})
        }
    }
    catch (error) {
        console.log(error)
        res.json({success:false,massage:error.massage})
    }
}
const  singleProduct = async (req,res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        if(!product) {
            return res.json({success:false,message:"ID NOT FOUND"})
        }
        else {
           return res.json({success:true,product:product})
        }
    }
    catch (error) {
        console.log(error)
        res.json({success:false,massage:error.massage})
    }
}
export {addProduct,listProduct,updateProduct,deleteProduct,singleProduct}