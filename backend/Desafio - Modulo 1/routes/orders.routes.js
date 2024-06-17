import e from "express";
import OrderController from "../controllers/order.controller.js";

const router = e.Router()

router.post('/', OrderController.createOrder)
router.get('/', OrderController.getOrders)
router.put('/', OrderController.updateOrder)
router.patch('/updateDelivery', OrderController.updateDelivery)
router.delete('/:id', OrderController.deleteOrders)
router.get('/getTotalPedidosCliente', OrderController.getTotalPedidosCliente)
router.get('/getTotalValorProdutos', OrderController.getTotalValorProdutos)
router.get('/getProdutosMaisVendidos', OrderController.getProdutosMaisVendidos)
router.get('/:id', OrderController.getOrdersById)


router.use((error, req, res, next) => {
  console.error(`Error - ${req.method.toUpperCase()} ${req.originalUrl} - ${error.message}`)
  
  res.status(400).send({ error: error.message })
})
export default router
