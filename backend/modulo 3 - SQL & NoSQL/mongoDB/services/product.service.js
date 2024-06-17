import ProductRepository from "../repositories/product.repository.js";
import SupplierRepository from "../repositories/supplier.repository.js";
import SaleRepository from "../repositories/sale.repository.js";
import ProductInfoRepository from "../repositories/productInfo_old.repository.js";

async function createProduct(product) {
	const supplier = await SupplierRepository.getSupplier(product.supplierId);
	if (!supplier) {
		throw new Error("O Supplier informado não existe");
	}
	return await ProductRepository.insertProduct(product);
}

async function getProducts() {
	return await ProductRepository.getProducts();
}

async function getProduct(id) {
  const product = await ProductRepository.getProduct(id)
  product.info = await ProductInfoRepository.getProductInfo(parseInt(id))

	return product;
}

async function deleteProduct(product_id) {
	const sale = await SaleRepository.getSalesByProductId(product_id);
	if (sale.length)
		throw new Error("Impossivel deletar um produto cujo venda existe!");
	return await ProductRepository.deleteProduct(product_id);
}
async function updateProduct(product) {
	const supplier = await SupplierRepository.getSupplier(product.supplierId);
	if (!supplier) {
		throw new Error("O Supplier informado não existe");
	}
	return await ProductRepository.updateProduct(product);
}

async function createProductInfo(productInfo) {
	await ProductInfoRepository.createProductInfo(productInfo);
}
async function updateProductInfo(productInfo) {
	await ProductInfoRepository.updateProductInfo(productInfo);
}

async function createReview(review, productId) {
	await ProductInfoRepository.createReview(review, productId);
}
async function deleteReview(id, index) {
	await ProductInfoRepository.deleteReview(parseInt(id), parseInt(index));
}

async function getAllProductInfo() {
  return await ProductInfoRepository.getAllProductInfo()
}


async function deleteProductInfo(id) {
	await ProductInfoRepository.deleteProductInfo(parseInt(id));
}

export default {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
	createProductInfo,
  updateProductInfo,
  createReview,
  deleteReview,
  getAllProductInfo,
  deleteProductInfo
};
