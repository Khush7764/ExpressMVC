const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/AuthController");
const {
	registerValidator,
	loginValidator,
} = require("../validators/authValidator");
const validate = require("../middlewares/validate");

router.post("/login", loginValidator, validate, loginUser);
router.post("/register", registerValidator, validate, registerUser);

module.exports = router;
