const express = require('express');
const router = express.Router();
const saleReportController = require('../controllers/saleReportController');

router
    .route('/daily_sale_reports')
    .get(saleReportController.list_daily_sale_reports)
router
    .route('/monthly_sale_reports')
    .get(saleReportController.list_monthly_sale_reports)
router
    .route('/yearly_sale_reports')
    .get(saleReportController.list_yearly_sale_reports)


module.exports = router;