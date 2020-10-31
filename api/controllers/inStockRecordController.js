const InStockRecord = require('../models/inStockModel');
const PurchaseRecord = require('../models/purchaseRecordModel');
const SaleRecord = require('../models/saleRecordModel');

exports.list_all_in_stock_records = async (req, res) => {
    try {
        const aggregation = [];
        aggregation.push({ $match: { status: 'active' } })
        aggregation.push({
            $group: {
                _id: "$goodType",
                totalOfQty: { $sum: "$quantity" }
            }
        });

        aggregation.push({
            $sort: {
                "_id": 1
            }
        })


        const sumOfEachPurchaseItem = await PurchaseRecord.aggregate(aggregation);
        const sumOfEachSaleItem = await SaleRecord.aggregate(aggregation);
        let inStockOfEachItem = [];

        Object.keys(sumOfEachPurchaseItem).map((index) => {
            let total = 0;
            if (sumOfEachPurchaseItem[index]._id ==
                sumOfEachSaleItem.findIndex(sale =>
                    sale._id = sumOfEachPurchaseItem[index]._id)) {
                total = sumOfEachPurchaseItem[index].totalOfQty - sumOfEachSaleItem[index].totalOfQty;
            } else {
                total = sumOfEachPurchaseItem[index].totalOfQty;
            }

            inStockOfEachItem.push({
                "stockType": sumOfEachPurchaseItem[index]._id,
                "totalOfQty": total,
                "status": "active"
            })
        });
        return res.status(200).json(inStockOfEachItem);

    } catch (error) {
        res.status(500).send(error);
    }
}