import moment from 'moment';
import { useSelector } from 'react-redux';

const Header = () => {
	const { month, day, year } = useSelector((state) => state.date);
	console.log();
	return (
		<header>
			<h1>Monthly Expenses</h1>
			<button>{moment(`${year}/${month}/${day}`).format('MMMM')}</button>
		</header>
	);
};

export default Header;
