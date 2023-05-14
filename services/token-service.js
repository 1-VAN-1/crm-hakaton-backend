const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

const ACCESS_TOKEN_EXPIRES_IN = '7d';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

const REFRESH_TOKEN_EXPIRES_IN_DAYS = 30;

class TokenService {
	get accessTokenExpiresIn() {
		return ACCESS_TOKEN_EXPIRES_IN;
	}

	get refreshTokenExpiresIn() {
		return REFRESH_TOKEN_EXPIRES_IN;
	}

	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: this.accessTokenExpiresIn,
		});

		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: this.refreshTokenExpiresIn,
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (error) {
			return null;
		}
	}

	async saveToken(userId, refreshToken, ip) {
		const existingToken = await TokenModel.findOne({ ip, user: userId });

		if (existingToken) {
			return existingToken;
		}

		const now = new Date();
		const expireAt = new Date();

		expireAt.setDate(now.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

		const token = await TokenModel.create({
			user: userId,
			refreshToken: refreshToken,
			expireAt,
			ip,
		});

		return token;
	}

	async removeToken(refreshToken) {
		await TokenModel.deleteOne({ refreshToken });
	}

	async findToken(refreshToken) {
		const tokenData = await TokenModel.findOne({ refreshToken });

		return tokenData;
	}
}

module.exports = new TokenService();
