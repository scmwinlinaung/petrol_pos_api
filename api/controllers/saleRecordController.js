'use strict';

var SaleRecord = require('../models/saleRecordModel');
const { exists } = require('fs');

exports.list_all_sale_records = (req, res) => {
	console.log('Finding all Sale Records...');
	SaleRecord.find({ status: 'Active' }, (err, saleRecord) => {
		if (err) res.status(500).send(err);
		res.status(200).json(saleRecord);
	});
};

exports.create_a_sale_record = (req, res) => {
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

exports.read_a_sale_record = (req, res) => {
	try {
		console.log(`Find a course ${req.params.courseId}`);
		Course.findById(req.params.courseId, (err, course) => {
			let isEnroll = false;
			if (err) res.status(500).send(err);
			Enroll.find(
				{ userID: req.body.userID, courseID: course.courseID },
				(err, enrolls) => {
					if (err) res.status(500).send(err);
					if (enrolls.length > 0) isEnroll = true;
					console.log(isEnroll);

					res.status(200).json({ course: course, enroll: isEnroll });
				}
			);
		});
	} catch (error) {
		console.log(`[Get][Course] ${error}`);
		res.status(500).send(error);
	}
};

exports.update_a_sale_record = (req, res) => {
	try {
		SaleRecord.findOneAndUpdate(
			{ _id: req.params.courseId },
			req.body,
			{ new: true },
			(err, course) => {
				if (err) res.status(500).send(err);
				res.status(200).json(course);
			}
		);
	} catch (error) {
		console.log(`[Update][Course] ${error}`);
		res.status(500).send(error);
	}
};

exports.delete_a_sale_record = (req, res) => {
	try {
		SaleRecord.findOneAndUpdate(
			{
				_id: req.params.courseId,
			},
			{ status: 'inactive' },
			{ new: true },
			(err, course) => {
				if (err) res.status(500).send(err);
				res.status(200).json({ message: 'Course successfully deleted' });
			}
		);
	} catch (error) {
		console.log(`[Delete][Course] ${error}`);
		res.status(500).send(error);
	}
};

exports.get_a_sale_record = (req, res) => {
	try {
		console.log(`Find a course ${req.body.courseId}`);
		SaleRecord.findById(req.body.courseId, (err, course) => {
			let isEnroll = false;
			if (err) res.status(500).send(err);
			Enroll.find(
				{ userID: req.body.userID, courseID: course.courseID },
				(err, enrolls) => {
					if (err) res.status(500).send(err);
					if (enrolls.length > 0) isEnroll = true;
					console.log(isEnroll);

					res.status(200).json({ course: course, enroll: isEnroll });
				}
			);
		});
	} catch (error) {
		console.log(`[Get][Course] ${error}`);
		res.status(500).send(error);
	}
};

exports.list_sale_records_with_pagination = (req, res) => {
	try {
		const options = req.query;
		// validate options, send 400 on error
		const sort = options.sort || {};
		const filter = options.filter || {};
		const limit = 10;
		const page = parseInt(options.page) || 1;
		const skip = (page - 1) * limit;
		for(i in sort) {
			sort[i] = parseInt(sort[i]);
		}
		SaleRecord.find(filter)
			.sort(sort)
			.skip(skip)
			.limit(limit, function(err, data) {
			if(err) {
				return res.sendStatus(500);
			} else {
				return res.status(200).json({
					meta: { total: data.length },
					data
				});
			}
		});
	} catch(error) {
		console.log(`[Get][Course] ${error}`);
		res.status(500).send(error);
	}
};
