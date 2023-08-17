import Footer from '&/components/Footer';
import Me from './Authenticated';
import Login from './Unauthenticated/Login';

export default function InitMe() {
	const isLogined = localStorage.getItem('user');
	return (
		<div>
			{isLogined ? <Me /> : <Login />}
			<Footer />
		</div>
	);
}
