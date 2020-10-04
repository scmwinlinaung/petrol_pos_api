'use strict';

var PurchaseRecord = require('../models/purchaseRecordModel');
const { exists } = require('fs');

exports.list_all_purchase_records = (req, res) => {
	console.log('Finding all Sale Records...');
	PurchaseRecord.find({ status: 'Active' }, (err, purchaseRecord) => {
		if (err) res.status(500).send(err);
		res.status(200).json(purchaseRecord);
	});
};

exports.create_a_purchase_record = (req, res) => {
	try {
		var new_purchase_record = new PurchaseRecord(req.body);
		new_purchase_record.save((err, purchaseRecord) => {
			if (err) res.status(500).send(err);
			res.status(201).json(purchaseRecord);
		});
	} catch (error) {
		console.log(`[Create][PurchaseRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.read_a_purchase_record = (req, res) => {
	try {
		console.log(`Find a Purchase Record ${req.params.purchaseRecordId}`);
		PurchaseRecord.findById(req.params.purchaseRecordId, (err, purchaseRecord) => {
			if (err) res.status(500).send(err);
			if(purchaseRecord.status == "Active")
				res.status(200).json(purchaseRecord);
			else
				res.status(404).send("Purchase Record Not Found")
		});
	} catch (error) {
		console.log(`[Get][PurchaseRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.update_a_purchase_record = (req, res) => {
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
		console.log(`[Update][PurchaseRecord] ${error}`);
		res.status(500).send(error);
	}
};

exports.delete_a_purchase_record = (req, res) => {
	try {
		PurchaseRecord.findOneAndUpdate(
			{
				_id: req.params.purchaseRecordId,
			},
			{ status: 'inactive' },
			{ new: true },
			(err, purchaseRecord) => {
				if (err) res.status(500).send(err);
				res.status(200).json({ message: 'Purchase Record successfully deleted' });
			}
		);
	} catch (error) {
		console.log(`[Delete][PurchaseRecord] ${error}`);
		res.status(500).send(error);
	}
};


exports.list_purchase_records_with_pagination = async (req, res) => {
	try {
		const options = req.query;
		console.log(`req.query = ${JSON.stringify(req.query)}`)
		// validate options, send 400 on error
		const sort = options.sort || {};
		const filter = options.filter || {};
		const limit = 10;
		const page = parseInt(options.page) || 1;

		Object.keys(sort).map((key) => sort[key] = parseInt(sort[key]));
		
		console.log(`sort[key] = ${JSON.stringify(sort)}`)
		const aggregation = [];
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
