const UserModel = require('../models/user-model');

class UserService {
	async getUser(userId) {
		const user = await UserModel.findById(userId).populate('office');

		return user;
	}

	async patchUser(userId, { name, surname, skills }) {
		const user = await UserModel.findByIdAndUpdate(userId, {
			name,
			surname,
			skills,
		});

		const result = await UserModel.findById(user._id).populate('office');

		return result;
	}

	async getUsers(query) {
		const result = await UserModel.find(query)
			.skip(query._skip)
			.limit(query._limit)
			.populate('office');

		return result;
	}
}

module.exports = new UserService();
