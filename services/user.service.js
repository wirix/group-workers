import { UserDto } from '../dtos/user.dto.js';
import { ApiError } from '../exceptions/api.error.js';
import { userModel } from '../models/user.model.js';
import { tokenService } from './token.service.js';
import bcrypt from 'bcrypt';

class UserService {
	async register(email, password, fullName) {
		const candidate = await userModel.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest('Пользователь уже зарегистрирован');
		}

		const hashPassword = await bcrypt.hash(password, 5);
		const user = await userModel.create({ email, password: hashPassword, fullName });
		if (!user) {
			throw ApiError.BadRequest('Ошибка при создании пользователя');
		}

		const userDto = new UserDto(user);

		const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto });
		if (!(accessToken && refreshToken)) {
			throw ApiError.BadRequest('Ошибка при регистрации');
		}
		await tokenService.saveToken(userDto.id, refreshToken);

		const { password: _, ...userData } = userDto;

		return {
			...userData,
			accessToken,
			refreshToken
		};
	}

	async login(email, password) {
		const user = await userModel.findOne({ email });
		if (!user) {
			throw ApiError.BadRequest('Такого аккаунта не существует');
		}

		const isVerifyPassword = bcrypt.compare(password, user.password);
		if (!isVerifyPassword) {
			throw ApiError.BadRequest('Неверно введенные данные');
		}

		const userDto = new UserDto(user);

		const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto });
		if (!(accessToken && refreshToken)) {
			throw ApiError.BadRequest('Ошибка при входе');
		}
		await tokenService.saveToken(userDto.id, refreshToken);

		const { password: _, ...userData } = userDto;

		return {
			...userData,
			accessToken,
			refreshToken
		};
	}

	// async logout(req, res, next) {
	// 	return res.json({ '0': 13 });
	// }

	// async refresh(req, res, next) {

	// }
}

export const userService = new UserService();