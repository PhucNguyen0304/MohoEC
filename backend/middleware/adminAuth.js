import jwt from 'jsonwebtoken'
const adminAuth = async(req,res,next)=> {
   try {
    const {token} = req.headers
    console.log(token)
    if(!token) {
        return res.json({success:false,message:"No contain Token"})
    }
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    if(token_decode !== process.env.EMAIL+process.env.PASSWORD) {
        return res.json({success:false,message:"Invalid Token"})
    }
    next()
   } catch(error) {
    console.log(error)
    return res.json({succees:false,message:error.message})
   }
} 


export default adminAuth