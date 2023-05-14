const UserDto = require('../dto/user-dto');
const ApiError = require('../exceptions/api-error');
const userModel = require('../models/user-model');
const tokenService = require('./token-service');

class AuthService {
	async registration({ email, fullName, office, about }, ip) {
		const user = await userModel.create({ email, fullName, office, about });

		const userDto = new UserDto(user);

		const tokens = tokenService.generateTokens({ ...userDto });

		const tokenFromDb = await tokenService.saveToken(
			userDto.id,
			tokens.refreshToken,
			ip
		);

		const refreshToken = tokenFromDb.refreshToken;

		return { ...tokens, refreshToken, user: userDto };
	}

	async login({ email }, ip) {
		const user = await userModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest('Email is not exists');
		}

		const userDto = new UserDto(user);

		const tokens = tokenService.generateTokens({ ...userDto });

		const tokenFromDb = await tokenService.saveToken(
			userDto.id,
			tokens.refreshToken,
			ip
		);

		const refreshToken = tokenFromDb.refreshToken;

		return { ...tokens, refreshToken, user: userDto };
	}

	async logout(refreshToken) {
		await tokenService.removeToken(refreshToken);
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await userModel.findById(userData.id);

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		return { ...tokens, refreshToken, user: userDto };
	}
}

module.exports = new AuthService();
