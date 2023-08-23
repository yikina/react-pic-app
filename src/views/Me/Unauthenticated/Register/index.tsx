import { register } from '&/api';
import { Button, Form, Input, message } from 'antd';

export default function Register() {
	//密码必须包含一个大写字母、一个特殊字符，长度不小于8位数
	const passwordRegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

	const handleSubmit = ({
		cpassword,
		...values
	}: {
		username: string;
		password: string;
		cpassword: string;
	}) => {
		if (cpassword !== values.password) {
			message.error('请确认两次输入的密码相同');
			return;
		}

		if (!passwordRegExp.test(values.password)) {
			message.error('密码必须包含一个大写字符和一个特殊字符，且长度大于8位');
			return;
		} else {
			const registerData = {
				username: values.username,
				password: values.password
			};
			registerRequest(registerData);
		}
	};

	const registerRequest = async (registerData: {
		username: string;
		password: string;
	}) => {
		const [err, res] = await register(registerData);
		if (!err && res) {
			message.info('注册成功');
		}
	};

	return (
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

			<Form.Item
				name={'cpassword'}
				rules={[{ required: true, message: '请确认密码' }]}
			>
				<Input.Password
					placeholder={'确认密码'}
					type="password"
					id={'cpassword'}
				></Input.Password>
			</Form.Item>
			<Form.Item>
				<Button htmlType={'submit'} block>
					注册
				</Button>
			</Form.Item>
		</Form>
	);
}
