const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to DB");
	} catch {
		console.log("Failed to connect to DB");
	}
};

module.exports = connectDB;
