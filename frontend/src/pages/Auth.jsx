import axios from 'axios';
import { useState } from 'react';

const Auth = ({ setToken }) => {
	const [userData, setUserData] = useState({
		userName: '',
		password: '',
	});
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	console.log(process.env.REACT_APP_BASE_URL);
	const login = async () => {
		setErrors(null);
		setLoading(true);
		const url = process.env.REACT_APP_BASE_URL + '/auth';

		if (!userData.userName) {
			setErrors(["username can't be empty"]);
			setLoading(false);
			return;
		}
		if (!userData.password) {
			setErrors(["password can't be empty"]);
			setLoading(false);
			return;
		}

		await axios
			.post(url, userData)
			.then((res) => {
				console.log(res);
				localStorage.setItem('exp-token', res.data.token);
				setToken(res);
			})
			.catch((err) => {
				setErrors([err.response ? err.response.data.message : err.message]);
				console.log(err.response);
			});
		setLoading(false);
	};
	return (
		<div className='center screen'>
			<div className=' auth'>
				<h2 style={{ textAlign: 'center', marginBottom: 25 }}>Welcome Back</h2>
				<input
					type='text'
					placeholder='User name'
					value={userData.userName}
					onChange={(e) =>
						setUserData({ ...userData, userName: e.target.value })
					}
				/>
				<input
					type='password'
					placeholder='User password'
					value={userData.password}
					onChange={(e) =>
						setUserData({ ...userData, password: e.target.value })
					}
				/>
				<button disabled={loading} onClick={login}>
					LOGIN
					{loading && (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='15'
							height='15'
							stroke='#fff'
							style={{ marginLeft: 10 }}
							viewBox='0 0 38 38'>
							<g
								fill='none'
								fillRule='evenodd'
								strokeWidth='4'
								transform='translate(1 1)'>
								<circle cx='18' cy='18' r='18' strokeOpacity='0.5'></circle>
								<path d='M36 18c0-9.94-8.06-18-18-18'>
									<animateTransform
										attributeName='transform'
										dur='1s'
										from='0 18 18'
										repeatCount='indefinite'
										to='360 18 18'
										type='rotate'></animateTransform>
								</path>
							</g>
						</svg>
					)}
				</button>
				{errors &&
					errors.map((err, i) => (
						<div className='error' key={i}>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M10.29 3.85996L1.82002 18C1.64539 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9961 3.53002 21H20.47C20.8192 20.9961 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.4471 18.6453 22.3547 18.3024 22.18 18L13.71 3.85996C13.5318 3.56607 13.2807 3.32308 12.9812 3.15444C12.6817 2.98581 12.3438 2.89722 12 2.89722C11.6563 2.89722 11.3184 2.98581 11.0188 3.15444C10.7193 3.32308 10.4683 3.56607 10.29 3.85996V3.85996Z'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M12 9V13'
									stroke='#F91C1C'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M12 17H12.01'
									stroke='#F91C1C'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<p>{err}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default Auth;
