const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: '' },
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	format: { type: String, default: 'Общее' },
	type: { type: String, default: 'Онлайн' },
	date: { type: Date, default: Date.now },
	costPerParticipant: { type: Number, default: 0 },
	transferCost: { type: Number, default: 0 },
	cities: [{ type: String }],
});

module.exports = model('Activity', ActivitySchema);
