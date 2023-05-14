const officeModel = require('../models/office-model');

class OfficeService {
	async getOffices() {
		return await officeModel.find();
	}
}

module.exports = new OfficeService();
