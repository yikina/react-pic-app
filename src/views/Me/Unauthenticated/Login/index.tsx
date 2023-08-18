import { Button, Form, Input } from 'antd';

export default function Login() {
	return (
		<div className="login">
			<Form>
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
