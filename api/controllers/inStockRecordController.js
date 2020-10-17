const InStockRecord = require('../models/inStockModel');
const PurchaseRecord = require('../models/purchaseRecordModel');
const SaleRecord = require('../models/saleRecordModel');

exports.list_all_in_stock_records = async (req, res) => {
    try{
    const aggregation = [];
    aggregation.push({
        $group: {
            _id: "$goodType",
            totalOfQty:  { $sum: "$quantity" }
         }
    });

    aggregation.push({
        $sort: {
            "_id": 1
        }
    })

    const sumOfEachPurchaseItem = await PurchaseRecord.aggregate(aggregation);
    const sumOfEachSaleItem = await SaleRecord.aggregate(aggregation);
    var inStockOfEachItem = [];

    Object.keys(sumOfEachPurchaseItem).map((index) => inStockOfEachItem.push({
        "stockType": sumOfEachPurchaseItem[index]._id,
        "totalOfQty": 
        (sumOfEachPurchaseItem[index]._id == sumOfEachSaleItem[index]._id) 
        ? sumOfEachPurchaseItem[index].totalOfQty - sumOfEachSaleItem[index].totalOfQty : 0,
         "status": "active"
    }));

    return res.status(200).json(inStockOfEachItem);

} catch(error) {
	res.status(500).send(error);
}
}