import { userService } from '../services/user.service.js';

class UserController {
	async register(req, res, next) {
		try {
			const { email, password, fullName } = req.body;
			const { refreshToken, ...userData } = await userService.register(email, password, fullName);

			res.cookie('refreshToken', refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const { refreshToken, ...userData } = await userService.login(email, password);

			res.cookie('refreshToken', refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logout(req, res, next) {
		return res.json({ '0': 13 });
	}

	async refresh(req, res, next) {

	}
}

export const userController = new UserController();