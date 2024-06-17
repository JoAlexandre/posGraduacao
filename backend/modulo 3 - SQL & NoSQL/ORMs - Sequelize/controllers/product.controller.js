import ProductService from "../services/product.service.js"

async function createProduct(req, res, next) {
  let product = req.body
  
  try {
    if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    } 

    product = await ProductService.createProduct(product)
    res.send(product)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(product, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

async function getProducts(req, res, next) {
  
  try {
    res.send(await ProductService.getProducts())
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}
async function getProduct(req, res, next) {
  const product_id = req.params.id
  try {
    if (product_id == null) {
      throw new Error("product_id not found")
    }
    res.send(await ProductService.getProduct(product_id))
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function deleteProduct(req, res, next) {
  const product_id = req.params.id
  try {
    if (product_id == null) {
      throw new Error("product not found")
    }
    await ProductService.deleteProduct(product_id)
    res.end()
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`)
  } catch (error) {
    next(error)
  }
}

async function updateProduct(req, res, next) {
  let product = req.body
  
  try {
    if (!product.productId || !product.name || !product.description || product.stock == null || !product.value) {
      throw new Error('Existem parametros obrigatórios que NÃO FORAM informados')
    } 

    product = await ProductService.updateProduct(product)
    res.send(product)
    global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(product, null, 2)}`)
  } catch (error) {
    next(error)
  }
}

export default  {
  createProduct, getProducts, getProduct, deleteProduct, updateProduct
}