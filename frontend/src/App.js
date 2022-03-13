import { useState } from 'react';
import Auth from './pages/Auth';
import Dashhboard from './pages/Dashhboard';

import './styles/main.css';

function App() {
	const storedToken = localStorage.getItem('exp-token');
	const [token, setToken] = useState(storedToken);
	return (
		<div className='App'>
			{token ? <Dashhboard /> : <Auth setToken={setToken} />}
		</div>
	);
}

export default App;
