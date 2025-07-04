const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		console.error("Failed to create product:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
