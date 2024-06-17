import SupplierService from "../services/supplier.service.js"

async function createSupplier(req, res, next) {
  let supplier = req.body
  
  try {
    if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    } 

    supplier = await SupplierService.createSupplier(supplier)
    res.send(supplier)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(supplier, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

async function getSuppliers(req, res, next) {
  
  try {
    res.send(await SupplierService.getSuppliers())
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}
async function getSupplier(req, res, next) {
  const supplier_id = req.params.id
  try {
    if (supplier_id == null) {
      throw new Error("supplier_id not found")
    }
    res.send(await SupplierService.getSupplier(supplier_id))
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function deleteSupplier(req, res, next) {
  const supplier_id = req.params.id
  try {
    if (supplier_id == null) {
      throw new Error("supplier not found")
    }
    await SupplierService.deleteSupplier(supplier_id)
    res.end()
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function updateSupplier(req, res, next) {
  let supplier = req.body
  
  try {
    if (!supplier.supplierId || !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    } 

    supplier = await SupplierService.updateSupplier(supplier)
    res.send(supplier)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(supplier, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

export default  {
  createSupplier, getSuppliers, getSupplier, deleteSupplier, updateSupplier
}