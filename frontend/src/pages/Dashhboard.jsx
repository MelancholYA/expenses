import React from 'react';
import { Provider } from 'react-redux';
import Header from '../componants/Header';
import { store } from '../redux/store';

const Dashhboard = () => {
	return (
		<Provider store={store}>
			<Header />
		</Provider>
	);
};

export default Dashhboard;
