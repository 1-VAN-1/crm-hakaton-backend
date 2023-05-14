const activityService = require('../services/activity-service');

class ActivityController {
	async getActivities(req, res, next) {
		try {
			const activities = await activityService.getActivities(req.query);

			return res.json({
				activities,
			});
		} catch (error) {
			next(error);
		}
	}

	async getActivityById(req, res, next) {
		try {
			const activity = await activityService.getActivityById(req.params.id);

			return res.json({
				activity,
			});
		} catch (error) {
			next(error);
		}
	}

	async createActivity(req, res, next) {
		try {
			const activity = await activityService.createActivity(req.body);

			return res.json({
				activity,
			});
		} catch (error) {
			next(error);
		}
	}

	async patchActivity(req, res, next) {
		try {
			const activity = await activityService.patchActivity(
				req.params.id,
				req.body
			);

			return res.json({
				activity,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ActivityController();
