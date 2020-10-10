
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var purchaseRecordSchema = new Schema(
	{
		companyName: {
			type: String,
			required: true,
		},
		companyPhone: {
			type: String,
			required: false,
		},
		goodType: {
			type: String,
			required: true,
			index: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		rateFixed: {
			type: Number,
			required: true,
		},
		paymentType: {
			type: String
		},
		total: {
			type: Number,
			required: true
		},
		status: {
			type: String,
			default: 'active',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('purchases', purchaseRecordSchema);