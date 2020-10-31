const express = require('express');
const router = express.Router();
const monthlyPurchaseReportController = require('../controllers/monthlyPurchaseReportController');

	router
		.route('/monthly_purchase_reports')
		.get(monthlyPurchaseReportController.list_monthly_purchase_reports)

module.exports = router;