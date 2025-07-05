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
		const { search, page = 1, limit = 10, sort, category } = req.query;

		const intLimit = parseInt(limit);
		const intPage = parseInt(page);

		let objQuery = {};
		if (search) {
			objQuery.name = { $regex: search, $options: "i" }; // case-insensitive search
		}

		if (category) {
			objQuery.category = category;
		}

		let objSort = {};
		if (sort) {
			const [key, order] = sort.split("_");
			objSort[key] = order === "desc" ? -1 : 1;
		}

		const total = await Product.countDocuments(objQuery);

		const products = await Product.find(objQuery)
			.sort(objSort)
			.skip((intPage - 1) * intLimit)
			.limit(intLimit);

		res.status(200).json({
			total,
			page: intPage,
			limit: intLimit,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
