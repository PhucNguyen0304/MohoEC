import express from 'express'
import { updatePurchase,getPurchase ,checkIsPurchase,sendTrack,updateReviewProduct} from '../controller/purchaseController.js'
const purchaseRoute = express.Router()
purchaseRoute.post('/update',updatePurchase)
purchaseRoute.post('/get',getPurchase)
purchaseRoute.post('/checkispurchase',checkIsPurchase)
purchaseRoute.post('/sendtrack',sendTrack)
purchaseRoute.post('/updatestatusreview',updateReviewProduct)

export default purchaseRoute