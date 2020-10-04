const express = require('express');
const router = express.Router();
var purchaseRecord = require('../controllers/purchaseRecordController');

	router
		.route('/purchase_records')
		.get(purchaseRecord.list_all_purchase_records)

	router
		.route('/purchase_records/:purchaseRecordId')
		.get(purchaseRecord.read_a_purchase_record)
		.put(purchaseRecord.update_a_purchase_record)
		.delete(purchaseRecord.delete_a_purchase_record);
	
	router
		.route('/purchase_records_with_pagination')
		.get(purchaseRecord.list_purchase_records_with_pagination)

module.exports = router;