import express from 'express'
import { sendMessage, getMessage } from '../controller/messageController.js'
import upload from '../middleware/multer.js'

const msgRoute = express.Router()

msgRoute.post('/send', sendMessage);
msgRoute.post('/get', getMessage)

export default msgRoute