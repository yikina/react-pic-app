import { Button, Form, Input } from 'antd';

export default function Register() {
	const handleSubmit = ({
		cpassword,
		...values
	}: {
		username: string;
		password: string;
		cpassword: string;
	}) => {
		//   if(cpassword!==values.password){
		//     onError(new Error("请确认两次输入的密码相同"));
		//     return;
		//   }
		//   run(register(values).catch(onError))
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
				<Input placeholder={'密码'} type="password" id={'password'}></Input>
			</Form.Item>

			<Form.Item
				name={'cpassword'}
				rules={[{ required: true, message: '请确认密码' }]}
			>
				<Input
					placeholder={'确认密码'}
					type="password"
					id={'cpassword'}
				></Input>
			</Form.Item>
			<Form.Item>
				<Button htmlType={'submit'} block>
					注册
				</Button>
			</Form.Item>
		</Form>
	);
}
