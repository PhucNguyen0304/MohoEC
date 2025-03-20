import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name:{type:String,require:true},
    price:{type:Number,require:true},
    color:{type:Array,require:true},
    category:{type:String,require:true},
    subCategory:{type:String,require:true},
    new:{type:Boolean,require:true},
    bestSeller:{type:Boolean,require:true},
    description:{type:String,require:true},
    image:{type:Array,require:true},
})
const productModel = mongoose.models.product || mongoose.model("product",productSchema)
export default productModel