import { getClient } from "./mongo.db.js";

async function createProductInfo(productInfo) {
	const client = getClient();

	try {
		await client.connect();
		await client.db("store").collection("productInfo").insertOne(productInfo);
	} catch (error) {
		throw error;
	} finally {
		await client.close();
	}
}

async function updateProductInfo(productInfo) {
	const client = getClient();
	try {
		await client.connect();
		await client
			.db("store")
			.collection("productInfo")
			.updateOne(
				{ productId: productInfo.productId },
				{ $set: { ...productInfo } }
			);
	} catch (error) {
	} finally {
		await client.close();
	}
}

async function getProductInfo(productId) {
	const client = getClient();

	try {
		await client.connect();
		return await client
			.db("store")
			.collection("productInfo")
			.findOne({ productId });
	} catch (error) {
		throw error;
	} finally {
		client.close();
	}
}

async function deleteProductInfo(productId) {
	const client = getClient();

	try {
		await client.connect();
		return await client
			.db("store")
			.collection("productInfo")
			.deleteOne({ productId });
	} catch (error) {
		throw error;
	} finally {
		client.close();
	}
}

async function getAllProductInfo() {
	const client = getClient();

	try {
		await client.connect();
		return await client
			.db("store")
			.collection("productInfo")
			.find({})
			.toArray();
	} catch (error) {
		throw error;
	} finally {
		client.close();
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
  deleteProductInfo
};
