const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
var cors = require('cors');
const Users = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Expenses = require('./models/expenses');
const moment = require('moment');
const { default: mongoose } = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var secret = process.env.JWT_SECRET;

const generateError = (message, status) => {
	return {
		message,
		status,
	};
};

const checkToken = (token) => {
	if (!token) {
		return generateError('not authorized ,no token provided', 403);
	} else {
		try {
			let isValidToken = jwt.verify(token, process.env.JWT_SECRET);
			if (isValidToken) {
				return {
					valid: true,
					payload: isValidToken,
				};
			} else {
				return generateError('not authorized , invalid token', 403);
			}
		} catch (error) {
			return generateError('not authorized , invalid signature', 403);
		}
	}
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

	res.status(200).json({
		token: jwt.sign(
			{ userName: userData.userName, id: userData._id },
			process.env.JWT_SECRET,
		),
	});
});

//Expenses Auth

//get day related expenses
app.get('/api/day/:date', async (req, res) => {
	let token = req.headers['x-auth-token'];
	let validToken = checkToken(token);
	if (!validToken?.valid) {
		return res.status(403).json(validToken);
	}

	let { date } = req.params;
	if (!date) {
		return res.status(400).json(generateError('No date was provided', 400));
	}

	let expenses = await Expenses.find({
		createdAt: {
			$lt: moment(date).endOf('day'),
			$gt: moment(date).startOf('day'),
		},
		user: validToken.payload.id,
	}).select('-_id -user -createdAt -updatedAt -__v');
	res.json(expenses);
});

//get month related expenses
app.get('/api/month/:date', async (req, res) => {
	let token = req.headers['x-auth-token'];
	let validToken = checkToken(token);
	if (!validToken.valid) {
		return res.status(403).json(validToken);
	}

	let { date } = req.params;
	if (!date) {
		return res.status(400).json(generateError('No date was provided', 400));
	}
	const expenses = await Expenses.aggregate([
		{
			$match: {
				user: mongoose.Types.ObjectId(validToken.payload.id),
				createdAt: {
					$lt: moment(date).endOf('month').toDate(),
					$gt: moment(date).startOf('month').toDate(),
				},
			},
		},
		{
			$group: {
				_id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
				amount: { $sum: '$amount' },
			},
		},
	]);
	res.json(expenses);
});

//add expenses
app.post('/api', async (req, res) => {
	let token = req.headers['x-auth-token'];
	let { description, amount, special } = req.body;
	let validToken = checkToken(token);
	if (!validToken?.valid) {
		return res.status(403).json(validToken.payload);
	}
	if (!description || !amount) {
		return res.status(400).json(generateError('Invalid data', 400));
	}
	try {
		await Expenses.create({
			description,
			amount,
			special: special ?? false,
			user: validToken?.payload?.id,
		});
		return res.status(200).json({ description, amount });
	} catch (error) {
		return res.status(400).json(generateError(error, 400));
	}
});

app.listen(port, () => {
	console.log(`server runing  on port ${port}`);
});
