
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var saleRecordSchema = new Schema(
	{
		customerName: {
			type: String,
			required: true,
		},
		customerPhone: {
			type: String,
			required: true,
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

module.exports = mongoose.model('SaleRecords', saleRecordSchema);
