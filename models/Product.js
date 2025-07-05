const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	category: {
		type: String,
		required: true,
		enum: ["laptop", "mobile", "accessory", "tv", "other"],
	},
});

module.exports = mongoose.model("Product", ProductSchema);
