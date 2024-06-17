import ProductService from "../services/product.service.js";

async function createProduct(req, res, next) {
	let product = req.body;

	try {
		if (
			!product.name ||
			!product.description ||
			!product.value ||
			!product.stock ||
			!product.supplierId
		) {
			throw new Error(
				"Existem parametros obrigatórios que NÃO FORAM informados"
			);
		}

		product = await ProductService.createProduct(product);
		res.send(product);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(
				product,
				null,
				2
			)}`
		);
	} catch (error) {
		next(error);
	}
}

async function getProducts(req, res, next) {
	try {
		res.send(await ProductService.getProducts());
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
	} catch (error) {
		next(error);
	}
}
async function getProduct(req, res, next) {
	const product_id = req.params.id;
	try {
		if (product_id == null) {
			throw new Error("product_id not found");
		}
		res.send(await ProductService.getProduct(product_id));
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
	} catch (error) {
		next(error);
	}
}

async function deleteProduct(req, res, next) {
	const product_id = req.params.id;
	try {
		if (product_id == null) {
			throw new Error("product not found");
		}
		await ProductService.deleteProduct(product_id);
		res.end();
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
	} catch (error) {
		next(error);
	}
}

async function updateProduct(req, res, next) {
	let product = req.body;

	try {
		if (
			!product.productId ||
			!product.name ||
			!product.description ||
			product.stock == null ||
			!product.value
		) {
			throw new Error(
				"Existem parametros obrigatórios que NÃO FORAM informados"
			);
		}

		await ProductService.updateProduct(product);
		res.end();
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(
				product,
				null,
				2
			)}`
		);
	} catch (error) {
		next(error);
	}
}
async function createProductInfo(req, res, next) {
	let product = req.body;

	try {
		if (!product.productId) {
			throw new Error("ProductId não informado");
		}

		await ProductService.createProductInfo(product);
		res.end();
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(
				product,
				null,
				2
			)}`
		);
	} catch (error) {
		next(error);
	}
}
async function updateProductInfo(req, res, next) {
	let product = req.body;

	try {
		if (!product.productId) {
			throw new Error("ProductId não informado");
		}

		await ProductService.updateProductInfo(product);
		res.end();
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(
				product,
				null,
				2
			)}`
		);
	} catch (error) {
		next(error);
	}
}
async function createReview(req, res, next) {
	let product = req.body;

	try {
		if (!product.productId || !product.review) {
			throw new Error("ProductId e Review nao informado não informado");
		}

		await ProductService.createReview(product.review, product.productId);
		res.end();
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(
				product,
				null,
				2
			)}`
		);
	} catch (error) {
		next(error);
	}
}
async function deleteReview(req, res, next) {
	let product = req.params;

  try {
		await ProductService.deleteReview(product.id, product.index);
		res.end();
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(
				product,
				null,
				2
			)}`
		);
	} catch (error) {
		next(error);
	}
}
async function getAllProductInfo(req, res, next) {
  try {
    const product = await ProductService.getAllProductInfo()
		res.send(product);
		global.logger.info(
			`${req.method.toUpperCase()} ${req.originalUrl} ${JSON.stringify(
				product,
				null,
				2
			)}`
		);
	} catch (error) {
		next(error);
	}
}


async function deleteProductInfo(req, res, next) {
	const product_id = req.params.id;
	try {
		if (product_id == null) {
			throw new Error("product not found");
		}
		await ProductService.deleteProductInfo(product_id);
		res.end();
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
	} catch (error) {
		next(error);
	}
}

export default {
	createProduct,
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
	createProductInfo,
	updateProductInfo,
	createReview,
  deleteReview,
  getAllProductInfo,
  deleteProductInfo
};
