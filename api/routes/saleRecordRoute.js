const express = require('express');
const router = express.Router();
var saleRecord = require('../controllers/saleRecordController');

	router
		.route('/sale_records')
		.get(saleRecord.list_all_sale_records)
	
	router
		.route('/sale_records_with_pagination')
		.get(saleRecord.list_sale_records_with_pagination)

module.exports = router;