import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Months from './Months';

const Header = () => {
	const { month, day, year } = useSelector((state) => state.date);
	const [showMonths, setShowMonths] = useState(false);
	return (
		<header>
			<h1>Monthly Expenses</h1>
			<button onClick={() => setShowMonths(true)}>
				{moment(`${year}-${month}-${day}`).format('MMMM')}
			</button>
			{showMonths && <Months setShowMonths={setShowMonths} />}
		</header>
	);
};

export default Header;
