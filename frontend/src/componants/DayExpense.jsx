import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const DayExpense = ({ date, amount }) => {
	const [expend, setExpend] = useState(false);
	const [request, setRequest] = useState({
		loading: true,
		error: null,
		totals: [],
	});

	const getTotals = async () => {
		setRequest((prev) => ({ ...prev, loading: true }));
		await axios(`${process.env.REACT_APP_BASE_URL}/day/${date}`, {
			headers: {
				'x-auth-token': localStorage.getItem('exp-token'),
			},
		})
			.then((res) =>
				setRequest((prev) => ({
					...prev,
					loading: false,
					error: null,
					totals: res.data,
				})),
			)
			.catch((err) =>
				setRequest((prev) => ({
					...prev,
					loading: false,
					error: err.response ? err.response.data.message : err.message,
					totals: [],
				})),
			);
	};

	return (
		<li
			className='day'
			style={{
				height: expend ? 'auto' : 50,
			}}>
			<header
				className={`${date ? 'dayHeader' : ''}`}
				onClick={() => {
					setExpend(!expend);
					(request.loading || request.error) && getTotals();
				}}>
				<span>{moment(date).format('dddd Do')}</span>
				<span>{amount}</span>
			</header>
			{expend && (
				<ul className='subExpList'>
					{request.loading ? (
						<li>
							<span> Loding...</span>
							<span>
								<img
									src={require('../assets/bars.svg').default}
									width='25px'
									alt='loader'
								/>
							</span>
						</li>
					) : request.error ? (
						<li className='error'>{request.error}</li>
					) : (
						request.totals.map((item, i) => (
							<li>
								<span>{item.description}</span>
								<span>{item.amount}</span>
							</li>
						))
					)}
				</ul>
			)}
		</li>
	);
};

export default DayExpense;
