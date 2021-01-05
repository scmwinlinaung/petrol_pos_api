
const SaleRecord = require('../models/saleRecordModel');

exports.list_daily_sale_reports = async (req, res) => {
    try {
        console.log('Finding Monthly Sale Reports ...');
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();

        const aggregation = [];
        aggregation.push({
            $match: {
                status: 'active', $expr: {  // get current month and current year sale reports
                    $eq: [{ $month: "$createdAt" }, currentMonth],
                    $eq: [{ $year: "$createdAt" }, currentYear]
                }
            }
        })
        // aggregation.push({

        //   });
        aggregation.push(
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },

                    },
                    totalOfQty: { $sum: "$quantity" },
                    totalPrice: { $sum: { $multiply: ["$rateFixed", "$quantity"] } },
                    count: { $sum: 1 }
                }
            }
        );

        const saleRecord = await SaleRecord.aggregate(aggregation);
        return res.status(200).json(saleRecord);
    } catch (err) {
        res.status(500).send(error);
    }
};



exports.list_monthly_sale_reports = async (req, res) => {
    try {

        console.log('Finding Monthly Sale Reports ...');
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();

        const aggregation = [];
        aggregation.push({
            $match: {
                status: 'active', $expr: {  // get current month and current year sale reports
                    $eq: [{ $month: "$createdAt" }, currentMonth],
                    $eq: [{ $year: "$createdAt" }, currentYear]
                }
            }
        })
        aggregation.push(
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                        goodType: "$goodType"
                    },
                    totalOfQty: { $sum: "$quantity" },
                    totalPrice: { $sum: { $multiply: ["$rateFixed", "$quantity"] } },
                    count: { $sum: 1 }
                }
            }
        );

        const saleRecord = await SaleRecord.aggregate(aggregation);
        return res.status(200).json(saleRecord);
    } catch (err) {
        res.status(500).send(error);
    }
};

exports.list_yearly_sale_reports = async (req, res) => {
    try {

        console.log('Finding Monthly Sale Reports ...');
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();

        const aggregation = [];
        aggregation.push({
            $match: {
                status: 'active', $expr: {  // get  current year sale reports
                    $eq: [{ $year: "$createdAt" }, currentYear]
                }
            }
        })
        aggregation.push(
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                        goodType: "$goodType"
                    },
                    totalOfQty: { $sum: "$quantity" },
                    totalPrice: { $sum: { $multiply: ["$rateFixed", "$quantity"] } },
                    count: { $sum: 1 }
                }
            }
        );

        const saleRecord = await SaleRecord.aggregate(aggregation);
        return res.status(200).json(saleRecord);
    } catch (err) {
        res.status(500).send(error);
    }
};

