import { login } from '&/api';
import { saveUserInfo } from '&/store';
import { authData, loginedData } from '&/types';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const navigate = useNavigate();

	const handleSubmit = ({ username, password }: authData) => {
		const loginData = {
			username,
			password
		};

		const loginRequest = async (loginData: authData) => {
			const [err, res]: [any, loginedData | undefined] = await login(loginData);
			if (!err && res) {
				localStorage.setItem('token', res.accessToken);
				saveUserInfo(res);
				message.info('登录成功');
				navigate('/me', { replace: true });
			}
		};

		loginRequest(loginData);
	};

	return (
		<div className="login">
			<Form onFinish={handleSubmit}>
				<Form.Item
					name={'username'}
					rules={[{ required: true, message: '请输入用户名' }]}
				>
					<Input placeholder={'用户名'} type="text" id={'username'}></Input>
				</Form.Item>

				<Form.Item
					name={'password'}
					rules={[{ required: true, message: '请输入密码' }]}
				>
					<Input.Password
						placeholder={'密码'}
						type="password"
						id={'password'}
					></Input.Password>
				</Form.Item>
				<Form.Item>
					<Button htmlType={'submit'} block>
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
