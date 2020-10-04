const express = require('express');
const router = express.Router();
var userController = require('../controllers/userController');

	router
		.route('/users')
		.get(userController.list_all_users)

	router
		.route('/users/:userId')
		.get(userController.read_a_user_record)
		.put(userController.update_a_user_record)
		.delete(userController.delete_a_user_record);
	
	router
		.route('/users_with_pagination')
		.get(userController.list_users_with_pagination)

module.exports = router;