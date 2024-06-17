import ProductInfoSchema from "../schemas/productInfo.schema.js";
import { connect } from "./mongo.db.js";

async function createProductInfo(productInfo) {
	try {
		const mongoose = await connect();
		const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
		productInfo = new ProductInfo(productInfo);
		await productInfo.save();
	} catch (error) {
		throw error;
	}
}

async function updateProductInfo(productInfo) {
	try {
		const mongoose = await connect();
		const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
		await ProductInfo.findOneAndUpdate(
			{ produtId: productInfo.productId },
			productInfo
		);
	} catch (error) {
		throw error;
	}
}

async function getProductInfo(productId) {
	try {
		const mongoose = await connect();
		const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
		return await ProductInfo.findOne({ productId }).exec();
	} catch (error) {
		throw error;
	}
}



async function getAllProductInfo() {
	try {
		const mongoose = await connect();
		const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
		return await ProductInfo.find({}).exec();
	} catch (error) {
		throw error;
	}
}

async function deleteProductInfo(productId) {
	try {
		const mongoose = await connect();
		const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
		return await ProductInfo.deleteOne({ productId })
	} catch (error) {
		throw error;
	}
}

async function createReview(review, productId) {
	try {
		const productInfo = await getProductInfo(productId);
		productInfo.reviews.push(review);
		await updateProductInfo(productInfo);
	} catch (error) {
		throw error;
	}
}
async function deleteReview(id, index) {
	try {
		const productInfo = await getProductInfo(id);
		// productInfo.reviews = productInfo.reviews.filter((_, id) => id != index)
		productInfo.reviews.splice(index, 1);
		await updateProductInfo(productInfo);
	} catch (error) {
		throw error;
	}
}

export default {
	createProductInfo,
	updateProductInfo,
	getProductInfo,
	createReview,
	deleteReview,
	getAllProductInfo,
	deleteProductInfo,
};
