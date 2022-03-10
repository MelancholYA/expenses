const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema([
	{
		description: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		special: Boolean,
	},
]);

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;
