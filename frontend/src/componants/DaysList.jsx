import DayExpense from './DayExpense';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AddExpense from './AddExpense';

const DaysList = () => {
	const { year, month, day } = useSelector((state) => state.date);

	const [request, setRequest] = useState({
		loading: true,
		error: null,
		totals: [],
	});

	useEffect(() => {
		const getTotals = async () => {
			setRequest((prev) => ({ ...prev, loading: true }));
			await axios(
				`${process.env.REACT_APP_BASE_URL}/month/${year}-${month}-${day}`,
				{
					headers: {
						'x-auth-token': localStorage.getItem('exp-token'),
					},
				},
			)
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
		getTotals();
	}, [year, month, day]);
	console.log(request);
	return (
		<ul className='list'>
			{request.loading ? (
				<li className='day'>
					<header className={'dayHeader'}>
						<span> Loding...</span>
						<span>
							<img
								src={require('../assets/bars.svg').default}
								width='25px'
								alt='loader'
							/>
						</span>
					</header>
				</li>
			) : request.error ? (
				<li className='error'>{request.error}</li>
			) : request.totals.length === 0 ? (
				<li className='day'>
					<header className={'dayHeader'}>
						<span>No Data</span>
					</header>
				</li>
			) : (
				request.totals.map((item) => (
					<DayExpense
						key={item._id}
						date={item._id}
						setRequest={setRequest}
						amount={item.amount}
					/>
				))
			)}
			{!request.loading && !request.error && <AddExpense />}
		</ul>
	);
};

export default DaysList;
