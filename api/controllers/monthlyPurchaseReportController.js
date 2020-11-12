
const PurchaseRecord = require('../models/purchaseRecordModel');

exports.list_monthly_purchase_reports = async (req, res) => {
    try {
        console.log('Finding Monthly Purchase Reports ...');
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

        const purchaseRecord = await PurchaseRecord.aggregate(aggregation);
        return res.status(200).json(purchaseRecord);
    } catch (err) {
        res.status(500).send(error);
    }
};
