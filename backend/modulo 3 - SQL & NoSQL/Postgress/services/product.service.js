import ProductRepository from "../repositories/product.repository.js"
import SupplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product) {
  const supplier = await SupplierRepository.getSupplier(product.supplier_id) 
  if (!supplier.length) {
    throw new Error("O Supplier informado não existe");
  }
  return await ProductRepository.insertProduct(product)
}

async function getProducts() {
  return await ProductRepository.getProducts()
}

async function getProduct(product_id) {
  return await ProductRepository.getProduct(product_id)
}

async function deleteProduct(product_id) {
  return await ProductRepository.deleteProduct(product_id)
}
async function updateProduct(product) {
  const supplier = await SupplierRepository.getSupplier(product.supplier_id) 
  if (!supplier.length) {
    throw new Error("O Supplier informado não existe");
  }
  return await ProductRepository.updateProduct(product)
}

export default {
  createProduct, getProducts, getProduct, updateProduct, deleteProduct
}