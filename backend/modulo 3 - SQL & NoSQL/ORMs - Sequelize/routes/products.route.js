import express from 'express'
import ProductController from '../controllers/product.controller.js'

const router = express.Router()


router.post('/', ProductController.createProduct)
router.delete('/:id', ProductController.deleteProduct)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)
router.put('/', ProductController.updateProduct)

export default router