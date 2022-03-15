import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
	totals: [],
};

export const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		addAmount: (state, action) => {
			let newState = state.totals.map((item) =>
				moment(item._id).isSame(moment(), 'day')
					? (item.amount += Number(action.payload))
					: item,
			);
			state = newState;
		},
		setTotals: (state, action) => {
			state.totals = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addAmount, setTotals } = expensesSlice.actions;

export default expensesSlice.reducer;
