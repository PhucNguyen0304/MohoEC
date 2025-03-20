import express from "express";
import { registerUser,loginUser,loginAdmin,getUsers,updateUser,deleteUser ,forgetPassword,resetPassword} from "../controller/userController.js";
import { updateCart, getCart } from '../controller/cartController.js';
import adminAuth from '../middleware/adminAuth.js'
const userRoute = express.Router()
userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)
userRoute.post("/admin",loginAdmin)
userRoute.get("/list",getUsers)
userRoute.post("/delete",deleteUser)
userRoute.post("/update",updateUser)
userRoute.post('/cart/update', updateCart);
userRoute.post('/getsinglecart', getCart);
userRoute.post('/forget-password', forgetPassword);
userRoute.post('/reset-password/:token', resetPassword);

export default userRoute