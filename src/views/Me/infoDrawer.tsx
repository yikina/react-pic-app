import { deletePic, getAvatarPicSign, update } from '&/api';
import { Button, Drawer, Form, Input, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { signData } from '&/types/file';
import './index.scss';
import {
	UploadChangeParam,
	UploadFile,
	UploadProps
} from 'antd/es/upload/interface';
import { updateBody } from '&/types';
import { useUserInfo } from '&/hooks';

type InfoDrawerProps = {
	userId: string;
	drawerVisible: boolean;
	onDrawerClose: () => void;
	username: string | undefined;
};

export const InfoDrawer: React.FC<InfoDrawerProps> = ({
	userId,
	drawerVisible,
	onDrawerClose,
	username
}) => {
	const { updateuser } = useUserInfo();
	const [form] = Form.useForm();
	const [avatar, setAvatar] = useState<UploadFile>();
	const [OSSData, setOSSData] = useState<signData>();

	const handlePreview = async () => {
		return;
	};
	const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
		const file = info.file as UploadFile<any>;
		setAvatar(file);
	};
	const handleRemove = (file: UploadFile) => {
		deletePic(file.url, OSSData?.signature);
		setAvatar(undefined);
	};
	const handleSubmit = ({ name }: { name: string }) => {
		const body: updateBody = {
			id: userId,
			nickname: name || '',
			avatar: avatar?.url || ''
		};
		updateUserRequest(body);
	};
	const getExtraData: UploadProps['data'] = (file) => ({
		key: file.url,
		OSSAccessKeyId: OSSData?.accessId,
		policy: OSSData?.policy,
		Signature: OSSData?.signature
	});
	const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
		if (!OSSData) return false;

		const expire = Number(OSSData.expire) * 1000;

		if (expire < Date.now()) {
			await getAvatarSignRequest();
		}

		const suffix = file.name.slice(file.name.lastIndexOf('.'));
		const isPic = ['.jpg', '.png', '.jpeg', '.webp', '.jfif'];
		if (!isPic.includes(suffix)) {
			message.info('头像只能上传图片');
			return Upload.LIST_IGNORE;
		}
		const filename = Date.now() + suffix;
		// @ts-ignore
		file.url = OSSData.dir + filename;
		console.log(avatar, 'avatar--');

		return file;
	};
	const updateUserRequest = async (body: updateBody) => {
		const [err, res] = await update(body);
		if (!err && res) {
			message.success('修改成功');
			updateuser(res);
			onDrawerClose();
		} else {
			return;
		}
	};

	const getAvatarSignRequest = async () => {
		const [err, res]: [any, signData] = await getAvatarPicSign();
		if (!err && res) {
			setOSSData(res);
		}
	};

	useEffect(() => {
		getAvatarSignRequest();
		// console.log(avatar, 'avatareffect--');
	}, [userId]);

	return (
		<Drawer
			title="编辑个人信息"
			placement="bottom"
			onClose={onDrawerClose}
			open={drawerVisible}
			height={'70%'}
		>
			<Form form={form} onFinish={handleSubmit}>
				<Upload
					action={OSSData?.host}
					listType="picture-circle"
					className="avatar-uploader"
					maxCount={1}
					data={getExtraData}
					onPreview={handlePreview}
					onRemove={handleRemove}
					onChange={handleChange}
					beforeUpload={beforeUpload}
				>
					<>+</>
				</Upload>

				<h5>用户名：{username}</h5>
				<span className="text">注：用户名作为登陆凭证，不可更改</span>

				<Form.Item
					name={'name'}
					rules={[{ message: '请输入更改后的昵称' }]}
					initialValue=""
				>
					<Input
						placeholder="请输入更改后的昵称"
						maxLength={20}
						style={{
							marginTop: '1rem',
							display: 'flex',
							justifyContent: 'center'
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						block
						htmlType={'submit'}
						style={{
							width: '30%'
						}}
					>
						确认
					</Button>
				</Form.Item>
			</Form>
		</Drawer>
	);
};
