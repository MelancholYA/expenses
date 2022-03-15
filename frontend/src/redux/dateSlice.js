import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
	month: moment().format('M'),
	day: moment().format('DD'),
	year: moment().format('YYYY'),
};

export const dateSlice = createSlice({
	name: 'date',
	initialState,
	reducers: {
		setMonth: (state, action) => {
			state.month = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setMonth } = dateSlice.actions;

export default dateSlice.reducer;
