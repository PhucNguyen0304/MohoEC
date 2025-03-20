import express from 'express'
import { addProduct,updateProduct,listProduct,deleteProduct,singleProduct} from '../controller/productController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'
const productRoute = express.Router()
productRoute.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRoute.post('/update',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},]),updateProduct)
productRoute.get('/list',listProduct)
productRoute.post('/delete',adminAuth,deleteProduct)
productRoute.post('/singleproduct',adminAuth,singleProduct)


export default productRoute