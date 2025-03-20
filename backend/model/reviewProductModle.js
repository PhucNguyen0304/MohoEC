import mongoose, { mongo, Schema } from 'mongoose'
const reviewProductSchema =  new mongoose.Schema({
    idProduct: ({type:String,required:true}),
    emailUser: ({type:String,required:true}),
    nameUser: ({type:String,required:true}),
    text: ({type:String,required:true}),
    image: ({type:String}),
    like: ({type:Array})
}, { timestamps: true })
const reviewProductModel = mongoose.models.reviewProducts || mongoose.model('reviewProducts',reviewProductSchema)
export default reviewProductModel
