import SaleRepository from "../repositories/sale.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import ClientRepository from '../repositories/client.repository.js'

async function createSale(sale) {
  let [product, client] = await Promise.all([
    ProductRepository.getProduct(sale.product_id),
    ClientRepository.getClient(sale.client_id)
  ])

  if (!client) throw new Error("O Client informado não existe");
  if (!product) throw new Error("O Product informado não existe");
  if (product.stock <= 0) throw new Error("O Produto não existe em Estoque");
  
  sale = await SaleRepository.insertSale(sale)
  
  product.stock = product.stock - 1
  await ProductRepository.updateProduct(product)
  
  return sale
}

async function getSales(product_id, client_id) {
  if (product_id) {
    return await SaleRepository.getSalesByProductId(product_id)
  }
  if (client_id) {
    return await SaleRepository.getSalesByClientId(client_id)
  }
  return await SaleRepository.getSales()
}

async function getSale(sale_id) {
  return await SaleRepository.getSale(sale_id)
}

async function deleteSale(sale_id) {
  let sale = await SaleRepository.getSale(sale_id)
  
  if (!sale) throw new Error("Sale não existe")
  
  const product = await ProductRepository.getProduct(sale.product_id)
  if(!product) throw new Error("Product não existe")

  product.stock = product.stock + 1

  
  sale = await SaleRepository.deleteSale(sale_id)
  await ProductRepository.updateProduct(product)
  
  return sale
}
async function updateSale(sale) {

  const [product, client] = await Promise.all([
    ProductRepository.getProduct(sale.product_id),
    ClientRepository.getClient(sale.client_id)
  ])

  if (!client.length) throw new Error("O Client informado não existe");
  if (!product.length) throw new Error("O Supplier informado não existe");

  return await SaleRepository.updateSale(sale)
  
  product.stock = product.stock + 1
  await ProductRepository.updateProduct(product)
  
  return sale
}

export default {
  createSale, getSales, getSale, updateSale, deleteSale
}