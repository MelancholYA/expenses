import { configureStore } from '@reduxjs/toolkit';
import dateSlice from './dateSlice';
import expensesSlice from './expensesSlice';

export const store = configureStore({
	reducer: {
		date: dateSlice,
		expense: expensesSlice,
	},
});
