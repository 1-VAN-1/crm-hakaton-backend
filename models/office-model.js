const { Schema, model } = require('mongoose');

const OfficeSchema = new Schema({
	name: { type: String, unique: true, required: true },
	address: { type: String, required: true },
});

module.exports = model('Office', OfficeSchema);
