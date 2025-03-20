import userModel from "../model/userModel.js";
import { io } from "../server.js";
const updatePurchase = async (req, res) => {
    try {
        const { email, products, status, idPay, totalAmount ,address,numberPhone,note,payMethod,track = 'Đang chuẩn bị hàng'} = req.body;
        console.log(email + typeof email, products, status, idPay, totalAmount ,address,numberPhone,note,payMethod)
        // Validate the request body
        if (!email || !products || !status || !idPay || !totalAmount) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        if(products.length === 0) {
            return res.json({success:false,message:"No have product"})
        }
        // Find the user by ID
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false,message:"user not found"})
        }

        // Update the user's purchase information
        user.purchase.push({
            products,
            status,
            idPay,
            totalAmount,
            address,
            numberPhone,
            note,
            payMethod,
            track,
            date: new Date()
        });

        // Save the updated user
        await user.save();

        return res.json({ success: true, message: "Purchase updated successfully",purchase:user.purchase });
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
};
    const getPurchase = async(req,res) => {
        try {
            const { email }  = req.body
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false,message:"Người dùng không tồn tại "})
        }
        return res.json({success:true,purchase:user.purchase})
        }catch(error) {
            console.log(error)
            return res.json({success:false,message:error.message})
        }
    }
    const checkIsPurchase = async(req,res) => {
        try {
            const {email, idPay } = req.body
            const user = await userModel.findOne({email})
            if(!user) {
                res.json({success:false,message:"User do not exist"})
            
            }
            const isIdPayExist = user.purchase.some(purchase => purchase.idPay === idPay)
           if (isIdPayExist) {
            return res.json({ success: false, message: "idPay already exists" });
        } else {
            return res.json({ success: true, message: "idPay does not exist, can add to purchase" });
        }
        } catch(error) {
            console.log(error)
            return res.json({success:false,message:error})
        }
    }
    const sendTrack = async(req,res)=> {
        try {
            const {name,email,idPay,track} = req.body
            const user = await userModel.findOne({email})
            if(!user) {
                res.json({success:false,message:"User do not exist"})
            }
            const purchase = user.purchase.find(purchase => purchase.idPay === idPay)
           if(!purchase) {
                return res.json({success:false,message:"Don't seek order"})
           }
           purchase.track = track
           await user.save()
           return res.json(({success:true,message:"Updated track",purchase}))
        }catch(error){
            console.log(error)
            return res.json({success:false,message:error.message})
        }
    }
    const updateReviewProduct = async(req,res) => {
        try {
            const { email,idPay,productId } = req.body
            const user = await userModel.findOne({email})
            if(!user) {
                return res.json({success:false,message:"user not found"})
            }
            const purchase = user.purchase.find((purchase)=>purchase.idPay === idPay)
            if(!purchase) {
                return res.json({success:false,message:"Purchase Not Found"})
            }
            const productPurchase = purchase.products.find((product)=>product._id === productId)
            if(!productPurchase) {
                return res.json({success:false,message:"Product of purchase not found"})
            }
           productPurchase.review = 'true'
           await user.save()
           io.emit("updateStatusOrder")
           return res.json(({success:true,message:"Updated Status Review",user}))
        }catch(error) {
            console.log(error)
            return res.json({success:false,message:error.message})
        }
    }
export { updatePurchase ,getPurchase,checkIsPurchase,sendTrack,updateReviewProduct};