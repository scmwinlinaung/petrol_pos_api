
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
			index: true,
		},
		password: {
			type: String,
			required: false,
		},
		role: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

userSchema.pre

module.exports = mongoose.model('users', userSchema);
