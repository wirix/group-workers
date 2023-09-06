import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
	const accessToken = req.headers.authorization.split(' ')[1];

	if (!accessToken) {
		return res.status(403).json({
			message: 'Нет доступа'
		});
	}

	try {
		const user = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
		req.userId = user.id;
		next();
	} catch (e) {
		return res.status(403).json({
			message: 'Нет доступа'
		});
	}
};