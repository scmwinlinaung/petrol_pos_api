
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var saleRecordSchema = new Schema(
	{
		saleRecordID: {
			type: String,
			required: true,
		},
		goodType: {
			type: String,
			required: true,
			index: true,
		},
		customerName: {
			type: String,
			required: false,
		},
		customerPhone: {
			type: String,
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
