const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema(
	[
		{
			description: {
				type: String,
				required: true,
			},
			user: {
				type: mongoose.Types.ObjectId,
				required: true,
				ref: 'Users',
			},
			amount: {
				type: Number,
				required: true,
			},
			special: {
				type: Boolean,
				required: true,
			},
		},
	],
	{ timestamps: true },
);

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;
