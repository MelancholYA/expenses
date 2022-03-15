import DayExpense from './DayExpense';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AddExpense from './AddExpense';
import { setTotals } from '../redux/expensesSlice';
import moment from 'moment';

const DaysList = () => {
	const { year, month, day } = useSelector((state) => state.date);
	const { totals } = useSelector((state) => state.expense);
	const dispatch = useDispatch();

	const [request, setRequest] = useState({
		loading: true,
		error: null,
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
				.then((res) => {
					setRequest((prev) => ({
						...prev,
						loading: false,
						error: null,
					}));
					dispatch(setTotals(res.data));
				})
				.catch((err) =>
					setRequest((prev) => ({
						...prev,
						loading: false,
						error: err.response ? err.response.data.message : err.message,
					})),
				);
		};
		getTotals();
	}, [year, month, day, dispatch]);
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
			) : totals.length === 0 ? (
				<li className='day'>
					<header className={'dayHeader'}>
						<span>No Data</span>
					</header>
				</li>
			) : (
				totals.map((item) => (
					<DayExpense
						key={item._id}
						date={item._id}
						manipulate={setRequest}
						amount={item.amount}
					/>
				))
			)}
			{!request.loading && !request.error && month === moment().format('M') && (
				<AddExpense />
			)}
		</ul>
	);
};

export default DaysList;
