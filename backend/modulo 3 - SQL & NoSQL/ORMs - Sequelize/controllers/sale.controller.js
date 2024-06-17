import SaleService from "../services/sale.service.js"

async function createSale(req, res, next) {
  let sale = req.body
  
  try {
    if (!sale.value || !sale.clientId || !sale.productId) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    } 

    sale.date = new Date()
    
    sale = await SaleService.createSale(sale)
    res.send(sale)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(sale, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

async function getSales(req, res, next) {
  
  try {
    res.send(await SaleService.getSales(req.query.productId, req.query.clientId,req.query.supplierId))
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}
async function getSale(req, res, next) {
  const sale_id = req.params.id
  try {
    if (sale_id == null) {
      throw new Error("sale_id not found")
    }
    res.send(await SaleService.getSale(sale_id))
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function deleteSale(req, res, next) {
  const sale_id = req.params.id
  try {
    if (sale_id == null) {
      throw new Error("sale not found")
    }
    await SaleService.deleteSale(sale_id)
    res.end()
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function updateSale(req, res, next) {
  let sale = req.body
  
  try {
    if (!sale.value || !sale.clientId || !sale.productId) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    }

    sale = await SaleService.updateSale(sale)
    res.send(sale)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(sale, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

export default  {
  createSale, getSales, getSale, deleteSale, updateSale
}