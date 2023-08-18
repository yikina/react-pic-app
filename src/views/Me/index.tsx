import Footer from '&/components/Footer';
import { useState } from 'react';
import Me from './Authenticated';
import Login from './Unauthenticated/Login';
import Register from './Unauthenticated/Register';
import { Button } from 'antd';
import './index.scss';

export default function InitMe() {
	const isLogined = localStorage.getItem('user');
	const [isLogin, setIsLogin] = useState(false);

	const handleClick = () => {
		setIsLogin(!isLogin);
	};
	return (
		<div>
			{isLogined ? (
				<Me />
			) : (
				<div className="add">
					<h2 className="title">{isLogin ? '登录' : '注册'}</h2>
					{isLogin ? <Login /> : <Register />}
					<Button type={'link'} onClick={handleClick}>
						{isLogin ? '没有账号，点击注册' : '已有账号，直接登录'}
					</Button>
				</div>
			)}
			<Footer />
		</div>
	);
}
