const service = require('../services/user-service');

class UserController {
	async getUser(req, res, next) {
		try {
			const user = await service.getUser(req.params.id);

			return res.json({ user });
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await service.getUsers(req.query);

			return res.json({ users });
		} catch (error) {
			next(error);
		}
	}

	async patchUser(req, res, next) {
		try {
			const user = await service.patchUser(req.user.id, req.body);

			return res.json({ user });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
