import { NavLink } from 'react-router-dom';
import './index.scss';

export default function Footer() {
	const token = localStorage.getItem('token');
	return (
		<div className="Footer">
			<NavLink to="/home">首页</NavLink>
			<NavLink to="/square">广场</NavLink>
			<NavLink to="/add">+</NavLink>
			<NavLink to="/discover">发现</NavLink>
			{token ? (
				<NavLink to="/me">我的</NavLink>
			) : (
				<NavLink to="/auth">我的</NavLink>
			)}
		</div>
	);
}
