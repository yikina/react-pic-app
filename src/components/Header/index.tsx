import { NavLink } from 'react-router-dom';
import './index.scss';

export const Header = () => {
	return (
		<div className="header">
			<NavLink to="/home/recommend">推荐</NavLink>
			<NavLink to="/home/focus">关注</NavLink>
		</div>
	);
};
