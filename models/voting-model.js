const { Schema, model } = require('mongoose');

const VotingSchema = new Schema({
	result: { type: Array, required: true },
	date: { type: Date, default: Date.now },
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = model('Voting', VotingSchema);
