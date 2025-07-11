const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const ProductRoutes = require("./routes/ProductRoute");
const AuthRoutes = require("./routes/UserRoute");
const authMiddleware = require("./middlewares/AuthMiddleware");
const checkRole = require("./middlewares/checkRole");

connectDB();
app.use(express.json());

app.use("/api/products", authMiddleware, checkRole("admin"), ProductRoutes);
app.use("/api", AuthRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
