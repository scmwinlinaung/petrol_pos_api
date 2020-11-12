'use strict';

const SaleRecord = require('../models/saleRecordModel');

exports.list_all_sale_debt_records = (req, res) => {
	console.log('Finding all Sale Records ...');
	SaleRecord.find({ status: 'active', paymentType: 'အကြွေး' }, (err, saleRecord) => {
		if (err) res.status(500).send(err);
		res.status(200).json(saleRecord);
	});
};

exports.create_a_sale_debt_record = (req, res) => {
	try {
		var new_sale_record = new SaleRecord(req.body);
		new_sale_record.save((err, saleRecord) => {
			if (err) res.status(500).send(err);
			res.status(201).json(saleRecord);
		});
	} catch (error) {
		console.log(`[Create][SaleRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.read_a_sale_debt_record = (req, res) => {
	try {
		console.log(`Find a Sale Record ${req.params.saleRecordId}`);
		SaleRecord.findById(req.params.saleRecordId, (err, saleRecord) => {
			if (err) res.status(500).send(err);
			if(saleRecord.status == "active" && saleRecord.paymentType == "အကြွေး")
				res.status(200).json(saleRecord);
			else
				res.status(404).send("Sale Record Not Found")
		});
	} catch (error) {
		console.log(`[Get][SaleRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.update_a_sale_debt_record = (req, res) => {
	try {
		SaleRecord.findOneAndUpdate(
			{ _id: req.params.saleRecordId, },
			req.body,
			{ new: true },
			(err, saleRecord) => {
				if (err) res.status(500).send(err);
				res.status(200).json(req.body);
			}
		);
	} catch (error) {
		console.log(`[Update][SaleRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.delete_a_sale_debt_record = (req, res) => {
	try {
		SaleRecord.findOneAndUpdate(
			{
				_id: req.params.saleRecordId,
			},
			{ status: 'inactive' },
			{ new: true },
			(err, saleRecord) => {
				if (err) res.status(500).send(err);
				res.status(200).json({ message: 'Sale Record successfully deleted' });
			}
		);
	} catch (error) {
		console.log(`[Delete][SaleRecord] ${error}`);
		res.status(500).send(error);
	}
};

// exports.get_a_sale_record = (req, res) => {
// 	try {
// 		console.log(`Find a course ${req.body.saleRecordId}`);
// 		SaleRecord.findById(req.body.saleRecordId, (err, saleRecord) => {
// 			let isEnroll = false;
// 			if (err) res.status(500).send(err);
// 			res.status(200).json(saleRecord);
// 		});
// 	} catch (error) {
// 		console.log(`[Get][Course] ${error}`);
// 		res.status(500).send(error);
// 	}
// };

exports.list_sale_debt_records_with_pagination = async (req, res) => {
	try {
		const options = req.query;
		console.log(`req.query = ${JSON.stringify(req.query)}`)
		// validate options, send 400 on error
		const sort = options.sort || {};
		const filter = options.filter || {};
		const search = options.search || {};
		const limit = null;
		const page = parseInt(options.page) || 0;

		Object.keys(sort).map((key) => sort[key] = parseInt(sort[key]));
		
		console.log(`sort[key] = ${JSON.stringify(sort)}`)
		const aggregation = [];

		if (search) {
			let searchStr = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				const regex = new RegExp(`${searchStr}*[a-zA-Z0-9!@#$%^&)(+=._\\-\\*]*`, "i");
			  aggregation.push({
				$match: {
				  $or: [
					{ customerName: { $regex: regex } },
					{ customerPhone: { $regex: regex } },
					{ goodType: { $regex: regex } },
					{ quantity: { $regex: regex } },
					{ rateFixed: { $regex: regex } },
					{ paymentType: { $regex: regex } },
					{ total: { $regex: regex } },
					{ createdAt: { $regex: regex } },
					{ updatedAt: { $regex: regex } },
				  ],
				},
			  })
		  
		  } 

		if (options.sort) aggregation.push({ $sort: sort });

		const skip = page * limit;
		aggregation.push({ $skip: skip });
	  
		if (limit) aggregation.push({ $limit: limit });

		aggregation.push({ $match: { status: 'active' }})

		const saleRecord = await SaleRecord.aggregate(aggregation)
		return res.status(200).json({
					meta: {
					skip,
					limit,
					sort,
					filter,
					page,
					total: saleRecord.length,
					},
					saleRecord,
					links: {
					self: req.originalUrl,
					}
				   });

		
		// SaleRecord.find(filter)
		// 	.sort(sort)
		// 	.skip(skip)
		// 	.limit(limit, (err, saleRecord) => {
		// 	console.log(`saleRecord = ${saleRecord}`)
		// 	if(err) {
		// 		return res.sendStatus(500);
		// 	} else {
		// 		return res.status(200).json({
		// 			meta: {
		// 			skip,
		// 			limit,
		// 			sort,
		// 			filter,
		// 			page,
		// 			total: saleRecord.length,
		// 			},
		// 			saleRecord,
		// 			links: {
		// 			self: req.originalUrl,
		// 			}
		// 		   });
		// 	}
		// });
	} catch(error) {
		console.log(`[Get][Course] ${error}`);
		res.status(500).send(error);
	}
};
