'use strict';

const PurchaseRecord = require('../models/purchaseRecordModel');
const { exists } = require('fs');

exports.list_all_purchase_debt_records = (req, res) => {
	console.log('Finding all Purchase Debt Records...');
	PurchaseRecord.find({ status: 'active', paymentType: 'အကြွေး' }, (err, purchaseRecord) => {
		if (err) res.status(500).send(err);
		res.status(200).json(purchaseRecord);
	});
};

exports.create_a_purchase_debt_record = (req, res) => {
	try {
		var new_purchase_record = new PurchaseRecord(req.body);
		new_purchase_record.save((err, purchaseRecord) => {
			if (err) res.status(500).send(err);
			res.status(201).json(purchaseRecord);
		});
	} catch (error) {
		console.log(`[Create][PurchaseDebtRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.read_a_purchase_debt_record = (req, res) => {
	try {
		console.log(`Find a Purchase Debt Record ${req.params.purchaseRecordId}`);
		PurchaseRecord.findById(req.params.purchaseRecordId, (err, purchaseRecord) => {
			if (err) res.status(500).send(err);
			if(purchaseRecord.status == "active" && purchaseRecord.paymentType == "အကြွေး")
				res.status(200).json(purchaseRecord);
			else
				res.status(404).send("Purchase Debt Record Not Found")
		});
	} catch (error) {
		console.log(`[Get][PurchaseDebtRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.update_a_purchase_debt_record = (req, res) => {
	try {
		PurchaseRecord.findOneAndUpdate(
			{ _id: req.params.purchaseRecordId },
			req.body,
			{ new: true },
			(err, purchaseRecord) => {
				if (err) res.status(500).send(err);
				res.status(200).json(req.body);
			}
		);
	} catch (error) {
		console.log(`[Update][PurchaseDebtRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.delete_a_purchase_debt_record = (req, res) => {
	try {
		PurchaseRecord.findOneAndUpdate(
			{
				_id: req.params.purchaseRecordId,
			},
			{ status: 'inactive' },
			{ new: true },
			(err, purchaseRecord) => {
				if (err) res.status(500).send(err);
				res.status(200).json({ message: 'Purchase Debt Record successfully deleted' });
			}
		);
	} catch (error) {
		console.log(`[Delete][PurchaseDebtRecord] ${error}`);
		res.status(500).send(error);
	}
};


exports.list_purchase_debt_records_with_pagination = async (req, res) => {
	try {
		const options = req.query;
		console.log(`req.query = ${JSON.stringify(req.query)}`)
		// validate options, send 400 on error
		const sort = options.sort || {};
		const filter = options.filter || {};
		const search = options.search || {};
		const limit = null;
		const page = parseInt(options.page) || 1;

		Object.keys(sort).map((key) => sort[key] = parseInt(sort[key]));
		console.log(`sort[key] = ${JSON.stringify(sort)}`)
		const aggregation = [];

		if (search) {
			let searchStr = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				const regex = new RegExp(`${searchStr}*[a-zA-Z0-9!@#$%^&)(+=._\\-\\*]*`, "i");
			  aggregation.push({
				$match: {
				  $or: [
					{ companyName: { $regex: regex } },
					{ companyPhone: { $regex: regex } },
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

		const skip = (page - 1) * limit;
		aggregation.push({ $skip: skip });
	  
		if (limit) aggregation.push({ $limit: limit });
		const purchaseRecord = await PurchaseRecord.aggregate(aggregation)
		return res.status(200).json({
					meta: {
					skip,
					limit,
					sort,
					filter,
					page,
					total: purchaseRecord.length,
					},
					purchaseRecord,
					links: {
					self: req.originalUrl,
					}
				   });

	} catch(error) {
		console.log(`[Get][Course] ${error}`);
		res.status(500).send(error);
	}
};
