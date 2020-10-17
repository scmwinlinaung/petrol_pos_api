const express = require('express');
const router = express.Router();
const purchaseDebtRecordController = require('../controllers/purchaseDebtRecordController');

	router
		.route('/purchase_debt_records')
		.get(purchaseDebtRecordController.list_all_purchase_debt_records)
		.post(purchaseDebtRecordController.create_a_purchase_debt_record)

	router
		.route('/purchase_debt_records/:purchaseRecordId')
		.get(purchaseDebtRecordController.read_a_purchase_debt_record)
		.put(purchaseDebtRecordController.update_a_purchase_debt_record)
		.delete(purchaseDebtRecordController.delete_a_purchase_debt_record);
	
	router
		.route('/purchase_debt_records_with_pagination')
		.get(purchaseDebtRecordController.list_purchase_debt_records_with_pagination)

module.exports = router;