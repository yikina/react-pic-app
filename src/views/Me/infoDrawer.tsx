import { deletePic, getAvatarPicSign } from '&/api';
import { Button, Drawer, Form, Input, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { signData } from '&/types/file';
import './index.scss';
import {
	UploadChangeParam,
	UploadFile,
	UploadProps
} from 'antd/es/upload/interface';

type InfoDrawerProps = {
	userId: string;
	drawerVisible: boolean;
	onDrawerClose: () => void;
	logout: () => void;
};

export const InfoDrawer: React.FC<InfoDrawerProps> = ({
	userId,
	drawerVisible,
	onDrawerClose,
	logout
}) => {
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
		console.log(
			"🚀 ~ file: infoDrawer.tsx:57 ~ constbeforeUpload:UploadProps['beforeUpload']= ~ OSSData.dir:",
			OSSData.dir
		);
		console.log(file, 'fileuuuu--');

		return file;
	};

	const getAvatarSignRequest = async () => {
		const [err, res]: [any, signData] = await getAvatarPicSign();
		if (!err && res) {
			setOSSData(res);
		}
	};

	useEffect(() => {
		getAvatarSignRequest();
	}, [userId]);

	return (
		<Drawer
			title="编辑个人信息"
			placement="bottom"
			onClose={onDrawerClose}
			open={drawerVisible}
			height={'60%'}
		>
			<Form form={form}>
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

				<Form.Item
					name={'name'}
					rules={[{ required: true, message: '请输入更改后的用户名' }]}
				>
					<Input
						placeholder="请输入更改后的用户名"
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
