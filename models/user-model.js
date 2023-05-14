const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	fullName: { type: String, required: true },
	office: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
	about: { type: String },
});

module.exports = model('User', UserSchema);
