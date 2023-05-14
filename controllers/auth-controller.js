const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const authService = require('../services/auth-service');

class AuthController {
	async login(req, res, next) {
		try {
			const userData = await authService.login(req.body, req.ip);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json({
				accessToken: userData.accessToken,
				user: userData.user,
			});
		} catch (error) {
			next(error);
		}
	}

	async registration(req, res, next) {
		try {
			const userData = await authService.registration(req.body, req.ip);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json({
				accessToken: userData.accessToken,
				user: userData.user,
			});
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;

			await authService.logout(refreshToken);

			res.clearCookie('refreshToken');

			return res.status(200).end();
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await authService.refresh(refreshToken);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json({
				accessToken: userData.accessToken,
				user: userData.user,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthController();
