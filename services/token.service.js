import jwt from 'jsonwebtoken';
import { tokenModel } from '../models/token.model.js';

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' });
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	}

	async saveToken(userId, refreshToken) {
		const token = await tokenModel.findOne({ user: userId });
		if (!token) {
			await tokenModel.create({ user: userId, refreshToken });
			return token;
		}
		token.refreshToken = refreshToken;
		await token.save();
		return token;
	}

	validateRefreshToken(refreshToken) {
		const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		return token;
	}

	validateAccessToken(accessToken) {
		const token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
		return token;
	}

	async removeToken(token) {
		const userData = await tokenModel.deleteOne({ token });
		return userData;
	}
}

export const tokenService = new TokenService();