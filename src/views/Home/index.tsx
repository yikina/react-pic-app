import Footer from '&/components/Footer';
import { NavLink } from 'react-router-dom';
import './index.scss';

function Home() {
	return (
		<div>
			<div className="header">
				<NavLink to="/home/recommend">推荐</NavLink>
				<NavLink to="/home/focus">关注</NavLink>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
