const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please write a name'],
	},
	userName: {
		type: String,
		required: [true, 'Please write a unique username'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please write your password'],
	},
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
