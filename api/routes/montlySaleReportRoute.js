const express = require('express');
const router = express.Router();
const monthlySaleReportController = require('../controllers/monthlySaleReportController');

	router
		.route('/monthly_sale_reports')
		.get(monthlySaleReportController.list_monthly_sale_reports)

module.exports = router;