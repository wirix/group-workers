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
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	async refresh(req, res, next) {
		const { refreshToken } = req.cookies;
		const userData = await userService.refresh(refreshToken);

		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true
		});

		return res.json(userData);
	}

	async getUsers(req, res, next) {
		return res.json({1: 1});
	}
}

export const userController = new UserController();