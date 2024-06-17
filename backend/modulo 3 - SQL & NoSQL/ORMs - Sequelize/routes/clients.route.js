import express from 'express'
import ClientController from '../controllers/client.controller.js'

const router = express.Router()


router.post('/', ClientController.createClient)
router.delete('/:client_id', ClientController.deleteClient)
router.get('/', ClientController.getClients)
router.get('/:client_id', ClientController.getClient)
router.put('/', ClientController.updateClient)

export default router