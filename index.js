const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const ProductRoutes = require("./routes/ProductRoute");
const AuthRoutes = require("./routes/UserRoute");

connectDB();
app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api", AuthRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
