import React from 'react';
import { Provider } from 'react-redux';
import DaysList from '../componants/DaysList';
import Header from '../componants/Header';
import { store } from '../redux/store';

const Dashhboard = () => {
	return (
		<Provider store={store}>
			<Header />
			<DaysList />
		</Provider>
	);
};

export default Dashhboard;
