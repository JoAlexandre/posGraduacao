//PUT é utilizado para atualizar totalmente o dados
//PATCH é utilizado para atualizar parcialmente dos dados

import e from "express";
import accountController from "../controllers/account.controller.js";

const router = e.Router();

router.post("/", accountController.createAccount);
router.get('/', accountController.getAccounts)
router.get('/:id', accountController.getAccountByID)
router.delete('/:id', accountController.deleteAccounts)
router.put('/', accountController.updateAccounts)
router.patch('/updateBalance', accountController.updateBalance)


router.use((error, req, res, next) => {
  logger.error(`${req.method.toUpperCase()} ${req.originalUrl} - ${error.message}`)
  res.status(400).send({ error: error.message })
})
export default router;
