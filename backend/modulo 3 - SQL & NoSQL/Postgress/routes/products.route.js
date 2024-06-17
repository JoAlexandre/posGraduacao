import express from 'express'
import ProductController from '../controllers/product.controller.js'

const router = express.Router()


router.post('/', ProductController.createProduct)
router.delete('/:product_id', ProductController.deleteProduct)
router.get('/', ProductController.getProducts)
router.get('/:product_id', ProductController.getProduct)
router.put('/', ProductController.updateProduct)

export default router