const votingService = require('../services/voting-service');

class VotingController {
	async getVoting(req, res, next) {
		try {
			const voting = await votingService.getVoting(req.query);

			return res.json({
				voting,
			});
		} catch (error) {
			next(error);
		}
	}

	async getVotingById(req, res, next) {
		try {
			const voting = await votingService.getVotingById(req.params.id);

			return res.json({
				voting,
			});
		} catch (error) {
			next(error);
		}
	}

	async createVoting(req, res, next) {
		try {
			const activity = await votingService.createVoting(req.body);

			return res.json({
				activity,
			});
		} catch (error) {
			next(error);
		}
	}

	async patchVoting(req, res, next) {
		try {
			const voting = await votingService.patchVoting(
				req.params.date,
				req.body,
				req.user.id
			);

			return res.json({
				voting,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new VotingController();
