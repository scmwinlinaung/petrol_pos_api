const express = require('express');
const router = express.Router();
const purchaseRecordController = require('../controllers/purchaseRecordController');

	router
		.route('/purchase_records')
		.get(purchaseRecordController.list_all_purchase_records)
		.post(purchaseRecordController.create_a_purchase_record)

	router
		.route('/purchase_records/:purchaseRecordId')
		.get(purchaseRecordController.read_a_purchase_record)
		.put(purchaseRecordController.update_a_purchase_record)
		.delete(purchaseRecordController.delete_a_purchase_record);
	
	router
		.route('/purchase_records_with_pagination')
		.get(purchaseRecordController.list_purchase_records_with_pagination)

module.exports = router;