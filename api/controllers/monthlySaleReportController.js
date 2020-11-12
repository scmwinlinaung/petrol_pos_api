
const SaleRecord = require('../models/saleRecordModel');

exports.list_monthly_sale_reports = async (req, res) => {
    try {
        console.log('Finding Monthly Sale Reports ...');
        const aggregation = [];
        aggregation.push({ $match: { status: 'active' } })
        aggregation.push(
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
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
