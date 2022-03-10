const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const Users = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Expenses = require('./models/expenses');

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secret = process.env.JWT_SECRET;

const generateError = (message, status) => {
	return {
		message,
		status,
	};
};
const generateToken = (data) => {
	return jwt.sign(data, secret);
};

connectDB();

// Auth Route
app.post('/api/auth', async (req, res) => {
	let { userName, password } = req.body;
	if (!userName || !password) {
		res.status(400).json(generateError('Invalid data', 400));
	}
	let userData = await Users.findOne({ userName });

	if (!userData) {
		return res
			.status(400)
			.json(generateError('No user was found with this username', 400));
	}
	const isValidPassword = await bcrypt.compare(password, userData.password);

	if (!isValidPassword) {
		return res.status(400).json(generateError('Wrong password', 400));
	}
	res.json({
		token: generateToken({
			userName: userData.userName,
		}),
	});
});

//Expenses Auth

//get date related expenses

//todo fix jwt.verify

app.get('/api/:date', async (req, res) => {
	let token = req.headers['x-auth-token'];
	let { date } = req.params;
	if (!token) {
		return res.status(403).json(generateError('no token provided', 403));
	}
	console.log({ secret });
	let isValidToken = jwt.verify(token, secret);
	console.log({ isValidToken });
	if (!isValidToken) {
		return res
			.status(403)
			.json(generateError('Not authorized , invalid token', 403));
	}
	if (!date) {
		return res.status(400).json(generateError('No date was provided', 400));
	}
	let expenses = await Expenses.find({ date }).select('-_id -date');
	res.json(expenses);
});
//add expenses
app.post('/api', async (req, res) => {
	let token = req.headers['x-auth-token'];
	let { descrtion, date, amount } = req.body;
	if (!token) {
		return res.status(403).json(generateError('nno token provided', 403));
	}

	res.json(expenses);
});

app.listen(port, () => {
	console.log(`server runing  on port ${port}`);
});
