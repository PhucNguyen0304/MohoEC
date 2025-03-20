import mongoose from 'mongoose'
const imagesArticleSchema = new mongoose.Schema({
    url:{type:String,required:true},
    note:{type:String}
},{timestamps:true})
const imagesArticleModel = mongoose.models.imagesArticle || mongoose.model('imagesArticle',imagesArticleSchema)
export default imagesArticleModel
