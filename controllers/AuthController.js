const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);

		await User.create({
			name,
			email,
			password: hashedPassword,
			role: role || "user",
		});

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: "User not found" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(401).json({ message: "Invalid credentials" });

		// Generate JWT
		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
