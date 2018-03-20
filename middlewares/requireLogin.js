module.exports = (req, res, next) => {
	// after one middleware is done it will call next for the next middleware
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in' });
	}

	next();
};
