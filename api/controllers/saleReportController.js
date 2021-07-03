
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
                status: 'active'
            }
        })
        aggregation.push(
            {
                $project: {
                    month: { $month: '$createdAt' }, year: { $year: '$createdAt' }
                    , quantity: '$quantity', rateFixed: '$rateFixed', goodType: '$goodType'
                }
            },
            { $match: { month: currentMonth + 1 } },
            { $match: { year: currentYear } },
        );
        aggregation.push(
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year",
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



exports.list_monthly_sale_reports = async (req, res) => {
    try {

        console.log('Finding Monthly Sale Reports ...');
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();

        const aggregation = [];
        aggregation.push({
            $match: {
                status: 'active'
            }
        })

        aggregation.push(
            {
                $project: {
                    month: { $month: '$createdAt' }, year: { $year: '$createdAt' }
                    , quantity: '$quantity', rateFixed: '$rateFixed', goodType: '$goodType'
                }
            },
            { $match: { month: currentMonth + 1 } },
            { $match: { year: currentYear } },
        );
        aggregation.push(
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year",
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

        console.log('Finding Yearly Sale Reports ...');
        const date = new Date();
        const currentYear = date.getFullYear();

        const aggregation = [];
        aggregation.push({
            $match: {
                status: 'active'
            }
        })


        aggregation.push(
            {
                $project: {
                    month: { $month: '$createdAt' },year: { $year: '$createdAt' }
                    , quantity: '$quantity', rateFixed: '$rateFixed', goodType: '$goodType'
                }
            },
            { $match: { year: currentYear } },
        );
        aggregation.push(
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year",
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

