import userModel from "../model/userModel.js";
const updateCart = async(req,res) => {
    try {
        const {email,cart} = req.body
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false,message:"User not Found"})
        }
        user.cart = cart
        await user.save()
        return res.json({success:true,cart:user.cart})
    }catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message,cart})
    }}
const getCart = async(req,res) => {
    try {   
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false,message:"User not Found"})
        }
        return res.json({success:true,cart:user.cart})
    }catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export {updateCart,getCart}