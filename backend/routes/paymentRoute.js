import express from 'express'
import { momowallet ,callback} from '../controller/paymentController.js'
const paymentRoute = express.Router()
paymentRoute.post('/momo/request',momowallet)
paymentRoute.get('/momo/callback',callback)

export default paymentRoute