const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		const accessToken = req.headers.authorization.split(' ').at(1);
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const decodedToken = tokenService.validateAccessToken(accessToken);

		req.user = decodedToken;

		next();
	} catch (error) {
		return next(ApiError.UnauthorizedError());
	}
};
