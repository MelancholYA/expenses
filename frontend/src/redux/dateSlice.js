import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
	month: moment().format('MM'),
	day: moment().format('DD'),
	year: moment().format('YYYY'),
};

export const dateSlice = createSlice({
	name: 'date',
	initialState,
	reducers: {
		setDate: (state, action) => {
			state = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
