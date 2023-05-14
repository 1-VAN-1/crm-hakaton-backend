const { BadRequest } = require('../exceptions/api-error');
const activityModel = require('../models/activity-model');
const userModel = require('../models/user-model');

class ActivityService {
	async getActivities(query) {
		const result = await activityModel
			.find({
				...query,
				...(query.startDate &&
					query.endDate && {
						date: {
							$gte: `${query.startDate}T00:00:00.000Z` || '1970-01-01',
							$lte: `${query.endDate}T23:59:59.999Z` || '2222-01-01',
						},
					}),
			})
			.skip(query._skip)
			.limit(query._limit)
			.populate('users');

		return result;
	}

	async getActivityById(id) {
		return await activityModel.findById(id).populate('users');
	}

	async createActivity({
		name,
		users,
		format,
		type,
		date,
		costPerParticipant,
		transferCost,
		cities,
		description,
	}) {
		if (Array.isArray(users) && users.length > 0)
			for (const userId of users) {
				if ((await userModel.exists({ _id: userId })) === null) {
					throw BadRequest(`Invalid id ${userId}`);
				}
			}

		return await activityModel.create({
			name,
			users,
			format,
			type,
			date,
			costPerParticipant,
			transferCost,
			cities,
			description,
		});
	}

	async patchActivity(
		id,
		{
			name,
			users,
			format,
			type,
			date,
			costPerParticipant,
			transferCost,
			cities,
			description,
		}
	) {
		if (Array.isArray(users) && users.length > 0)
			for (const userId of users) {
				if ((await userModel.exists({ _id: userId })) === null) {
					throw BadRequest(`Invalid id ${userId}`);
				}
			}

		const activity = await activityModel.findByIdAndUpdate(id, {
			name,
			users,
			format,
			type,
			date,
			costPerParticipant,
			transferCost,
			cities,
			description,
		});

		if (!activity) {
			throw BadRequest('Activity with this id is not existing');
		}

		return await activityModel.findById(activity._id);
	}
}

module.exports = new ActivityService();
