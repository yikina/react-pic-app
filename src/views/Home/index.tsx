import Footer from '&/components/Footer';
import { Outlet } from 'react-router-dom';
import { Header } from '&/components/Header';

function Home() {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

export default Home;
