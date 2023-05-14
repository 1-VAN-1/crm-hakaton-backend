const { BadRequest } = require('../exceptions/api-error');
const votingModel = require('../models/voting-model');

class VotingService {
	async getVoting(query) {
		const result = await votingModel
			.find(query)
			.skip(query._skip)
			.limit(query._limit);

		return result;
	}

	async getVotingById(id) {
		return await votingModel.findById(id);
	}

	async createVoting({ activities, description, date }) {
		const result = [];

		for (const activity of activities) {
			result.push({ name: activity, votes: 0, description });
		}

		return await votingModel.create({ result, date });
	}

	async patchVoting(date, { activity }, userId) {
		const voting = await votingModel.findOne({ date });

		if (voting.users.includes(userId)) {
			throw BadRequest('User already voted');
		}

		const foundResult = voting.result.findIndex(
			(value) => value.name === activity
		);

		if (foundResult === -1) {
			return voting;
		}

		voting.result = voting.result.map((v, i) =>
			i === foundResult ? { ...v, votes: v.votes + 1 } : v
		);

		voting.users = [...voting.users, userId];

		await voting.save();

		return voting;
	}
}

module.exports = new VotingService();
