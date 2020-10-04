'use strict';

var User = require('../models/userModel');
const { exists } = require('fs');

exports.list_all_users = (req, res) => {
	console.log('Finding all Users...');
	User.find({ status: 'Active' }, (err, user) => {
		if (err) res.status(500).send(err);
		res.status(200).json(user);
	});
};

exports.create_a_user_record = (req, res) => {
	try {
		var user = new User(req.body);
		user.save((err, user) => {
			if (err) res.status(500).send(err);
			res.status(201).json(user);
		});
	} catch (error) {
		console.log(`[Create][User] ${error}`);
		res.status(500).send(error);
	}
};

exports.read_a_user_record = (req, res) => {
	try {
		console.log(`Find a User Record ${req.params.userId}`);
		User.findById(req.params.userId, (err, user) => {
			if (err) res.status(500).send(err);
			if(user.status == "Active")
				res.status(200).json(user);
			else
				res.status(404).send(" User Not Found")
		});
	} catch (error) {
		console.log(`[Get][User] ${error}`);
		res.status(500).send(error);
	}
};

exports.update_a_user_record = (req, res) => {
	try {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			req.body,
			{ new: true },
			(err, user) => {
				if (err) res.status(500).send(err);
				res.status(200).json(req.body);
			}
		);
	} catch (error) {
		console.log(`[Update][User] ${error}`);
		res.status(500).send(error);
	}
};

exports.delete_a_user_record = (req, res) => {
	try {
		User.findOneAndUpdate(
			{
				_id: req.params.userId,
			},
			{ status: 'inactive' },
			{ new: true },
			(err, user) => {
				if (err) res.status(500).send(err);
				res.status(200).json({ message: 'User successfully deleted' });
			}
		);
	} catch (error) {
		console.log(`[Delete][User] ${error}`);
		res.status(500).send(error);
	}
};


exports.list_users_with_pagination = async (req, res) => {
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
		const user = await User.aggregate(aggregation)
		return res.status(200).json({
					meta: {
					skip,
					limit,
					sort,
					filter,
					page,
					total: user.length,
					},
					user,
					links: {
					self: req.originalUrl,
					}
				   });

	} catch(error) {
		console.log(`[Get][User] ${error}`);
		res.status(500).send(error);
	}
};
