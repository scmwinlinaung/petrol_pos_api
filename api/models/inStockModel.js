const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var inStockSchema = new Schema(
	{
		stockType: {
			type: String,
			required: true
		},
        totalOfQty: {
            type: Number,
            required: true
		},
		status: {
			type: String,
			required: true
		}
        
	},
	{ timestamps: true }
);


module.exports = mongoose.model('in_stock', inStockSchema);
