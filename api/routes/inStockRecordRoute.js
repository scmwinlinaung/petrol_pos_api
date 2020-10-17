const express = require('express');
const router = express.Router();
const inStockRecordController = require('../controllers/inStockRecordController');

	router
		.route('/in_stock_records')
		.get(inStockRecordController.list_all_in_stock_records)

module.exports = router;