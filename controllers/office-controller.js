const officeService = require('../services/office-service');

class OfficeController {
	async getOffices(req, res, next) {
		try {
			const offices = await officeService.getOffices();

			return res.json({
				offices,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new OfficeController();
