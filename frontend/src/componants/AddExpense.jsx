import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';

const AddExpense = ({ setRequest }) => {
	const [newExpense, setNewExpense] = useState({
		description: '',
		amount: 0,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const add = async () => {
		if (!newExpense.amount) {
			return setError('Please fill amount');
		}
		if (!newExpense.description) {
			return setError('Please add a description');
		}
		setLoading(true);
		await axios
			.post(`${process.env.REACT_APP_BASE_URL}`, newExpense, {
				headers: {
					'x-auth-token': localStorage.getItem('exp-token'),
				},
			})
			.then((res) => {
				//todo add result to array
				setError(null);
				console.log(res);
				setRequest((prev) =>
					prev.map((item) =>
						moment(item._id).isSame(moment(), 'day')
							? item.amount + res.data.amount
							: item,
					),
				);
			})
			.catch((err) => {
				setError(err.response ? err.response.data?.message : err.message);
			});
		setLoading(false);
	};
	console.log(error);
	return (
		<div style={{ background: '#ffffff21', padding: '12px', color: 'white' }}>
			<h3>ADD NEW</h3>
			{error && <div className='error'>{error}</div>}

			<div className='add'>
				<input
					required
					value={newExpense.description}
					onChange={(e) =>
						setNewExpense((prev) => ({ ...prev, description: e.target.value }))
					}
					type='text'
					placeholder='what did you do'
				/>
				<div>
					<input
						required
						type='number'
						placeholder='0000'
						value={newExpense.amount}
						onChange={(e) =>
							setNewExpense((prev) => ({ ...prev, amount: e.target.value }))
						}
					/>
					<button
						disabled={loading}
						onClick={add}
						style={{ backgroundColor: loading ? 'white' : '' }}>
						{loading ? (
							<img
								src={require('../assets/bars.svg').default}
								height='10px'
								alt='loader'
							/>
						) : (
							'Save'
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddExpense;
