const { check, validationResult } = require("express-validator");

exports.registerValidator = [
	check("name", "Name is required").notEmpty(),
	check("email", "Valid email required").isEmail(),
	check("password", "Password must be at least 6 characters").isLength({
		min: 6,
	}),
];

exports.loginValidator = [
	check("email", "Email is required").isEmail(),
	check("password", "Password is required").notEmpty(),
];
