const express = require('express');
const router = express.Router();
const saleDebtRecordController = require('../controllers/saleDebtRecordController');

	router
		.route('/sale_debt_records')
		.get(saleDebtRecordController.list_all_sale_debt_records)
		.post(saleDebtRecordController.create_a_sale_debt_record)

	router
		.route('/sale_debt_records/:saleRecordId')
		.get(saleDebtRecordController.read_a_sale_debt_record)
		.put(saleDebtRecordController.update_a_sale_debt_record)
		.delete(saleDebtRecordController.delete_a_sale_debt_record);
	
	router
		.route('/sale_debt_records_with_pagination')
		.get(saleDebtRecordController.list_sale_debt_records_with_pagination)

module.exports = router;