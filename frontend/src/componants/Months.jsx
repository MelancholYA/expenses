import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setMonth } from '../redux/dateSlice';

const Months = ({ setShowMonths }) => {
	const dispatch = useDispatch();

	const diff = moment().diff(moment().startOf('year'), 'months');
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let diffMonths = [];
	const setMonths = () => {
		let i = 0;
		while (i < diff + 1) {
			diffMonths.push(months[i]);
			i++;
		}
	};
	setMonths();
	return (
		<div className='months'>
			<ul>
				{diffMonths.map((month) => (
					<li
						onClick={() => {
							dispatch(setMonth((months.indexOf(month) + 1).toString()));
							setShowMonths(false);
						}}
						key={month}>
						{month}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Months;
