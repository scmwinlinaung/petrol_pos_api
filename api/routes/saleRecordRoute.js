const express = require('express');
const router = express.Router();
const saleRecordController = require('../controllers/saleRecordController');

	router
		.route('/sale_records')
		.get(saleRecordController.list_all_sale_records)
		.post(saleRecordController.create_a_sale_record)

	router
		.route('/sale_records/:saleRecordId')
		.get(saleRecordController.read_a_sale_record)
		.put(saleRecordController.update_a_sale_record)
		.delete(saleRecordController.delete_a_sale_record);
	
	router
		.route('/sale_records_with_pagination')
		.get(saleRecordController.list_sale_records_with_pagination)

module.exports = router;