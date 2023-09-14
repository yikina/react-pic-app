import Footer from '&/components/Footer';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Button } from 'antd';
import './index.scss';

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);

	const handleClick = () => {
		setIsLogin(!isLogin);
	};
	return (
		<div>
			<div className="add">
				<h2 className="title">{isLogin ? '登录' : '注册'}</h2>
				{isLogin ? <Login /> : <Register />}
				<Button type={'link'} onClick={handleClick}>
					{isLogin ? '没有账号，点击注册' : '已有账号，直接登录'}
				</Button>
			</div>
			<Footer />
		</div>
	);
}
