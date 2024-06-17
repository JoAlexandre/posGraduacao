import express from 'express'
import SupplierController from '../controllers/supplier.controller.js'

const router = express.Router()


router.post('/', SupplierController.createSupplier)
router.delete('/:id', SupplierController.deleteSupplier)
router.get('/', SupplierController.getSuppliers)
router.get('/:id', SupplierController.getSupplier)
router.put('/', SupplierController.updateSupplier)

export default router