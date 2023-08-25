import { NavLink } from 'react-router-dom';
import './index.scss';

export default function Footer() {
	return (
		<div className="Footer">
			<NavLink to="/home/recommend">首页</NavLink>
			<NavLink to="/square">广场</NavLink>
			<NavLink to="/add">+</NavLink>
			<NavLink to="/discover">发现</NavLink>
			<NavLink to="/me">我的</NavLink>
		</div>
	);
}
