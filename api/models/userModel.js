
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
			type: Number,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
