module.exports = function checkRole(role) {
	return (req, res, next) => {
		const userRole = req.user.role;

		if (!role.includes(userRole)) {
			return res
				.status(403)
				.json({ message: "Access denied - insufficient role" });
		}

		next();
	};
};
