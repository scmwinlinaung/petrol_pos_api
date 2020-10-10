'use strict';

var User = require('../models/userModel');
const { exists } = require('fs');
const bcrypt = require("bcryptjs");
const prod = require("../utils/prod.json");
const { generateAccessToken } = require('../middleware/auth');

exports.list_all_users = (req, res) => {
	console.log('Finding all Users...');
	User.find({ status: 'active' }, (err, user) => {
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
			if(user.status == "active")
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

exports.user_log_in = async (req, res) => {
	try {
	User.findOne({
		name: req.body.name
	  },
	  (err, user) => {

		if (err) res.status(500).send(err);

		if (!user) {
			return res.status(404).send({ message: "User Not found." });
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		  );
	
		if (!passwordIsValid) {
			return res.status(401).send({
			  token: null,
			  message: "Invalid Password!"
			});
		}
		const token = generateAccessToken(user.id)

		res.status(200).json({ 			
			name: user.name,
			phone: user.phone,
			email: user.email,
			role: user.role,
			token: token 
		});
	})
} catch(error) {
	res.status(500).send(error);
}
}

exports.user_log_out = async (req, res) => {
}

exports.user_sign_up = async(req, res) => {
	const user = new User({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		role: req.body.role
	  });
	
	  user.save((err, user) => {
		if (err) {
		  res.status(500).send({ message: err });
		  return;
		}
		res.status(200).json({ message: 'User successfully Registered' });
	});
}