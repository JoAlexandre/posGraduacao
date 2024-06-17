import express from 'express'
import ProductController from '../controllers/product.controller.js'

const router = express.Router()



router.get('/info', ProductController.getAllProductInfo)

router.post('/', ProductController.createProduct)
router.delete('/:id', ProductController.deleteProduct)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)
router.put('/', ProductController.updateProduct)

router.post('/info', ProductController.createProductInfo)
router.put('/info', ProductController.updateProductInfo)
router.post('/review', ProductController.createReview)
router.delete('/info/:id', ProductController.deleteProductInfo)
router.delete('/:id/review/:index', ProductController.deleteReview)


export default router