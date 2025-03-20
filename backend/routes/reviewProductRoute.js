import express from 'express'
import { sendReview,getReview } from '../controller/reviewProductController.js'
const reviewProductRoute = express.Router()
reviewProductRoute.post('/send',sendReview)
reviewProductRoute.get('/get/:idProduct',getReview)

export default reviewProductRoute