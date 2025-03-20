import express from 'express'
import { uploadImage, getImage, getArticleDetails} from '../controller/articleController.js'

const articleRoute = express.Router()

articleRoute.post('/sendImg', uploadImage)
articleRoute.get('/getImg', getImage)
articleRoute.get('/getarticle', getArticleDetails)
export default articleRoute
