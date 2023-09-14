import Footer from '&/components/Footer';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import temPic from '&/assets/temPic';
import { Button, Divider, Form, Input, Modal, Upload, message } from 'antd';
import './index.scss';
import { addNote, deletePic, getPicSign } from '&/api/files';
import { addNoteData, signData } from '&/types/file';
import { useSnapshot } from 'valtio';
import { state } from '&/store';
import { useNavigate } from 'react-router-dom';

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

function Add() {
	const naviagte = useNavigate();
	const temBody = JSON.parse(sessionStorage.getItem('add') || '{}');
	const { user } = useSnapshot(state);
	//OSS上传img
	const [OSSData, setOSSData] = useState<signData>();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImg, setPreviewImg] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	//TODO:DELETE initial imgList
	const [imgList, setImgList] = useState<UploadFile[]>([
		{
			uid: '-1',
			name: 'initial.png',
			status: 'done',
			url: temPic.userFace
		}
	]);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImg(`${OSSData?.host}/${file.url}` || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
		);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setImgList(newFileList);
	};

	const handleRemove = (file: UploadFile) => {
		const newImgList = imgList.filter((item) => item.url !== file.url);
		deletePic(file.url, OSSData?.signature);
		setImgList(newImgList);
	};

	const handleSubmit = ({
		title,
		context
	}: {
		title: string;
		context: string;
	}) => {
		if (imgList.length === 0) {
			message.info('请上传您想要分享的图片');
			return;
		}

		const body: addNoteData = {
			title: temBody.title ? temBody.title : title,
			content: temBody.content ? temBody.content : context,
			pic: temBody.pic
				? temBody.pic
				: imgList.map((item) => item.url).join(','),
			avatar: user.avatar,
			username: user.username
		};

		if (!user.username) {
			//如登录过期，存储编辑后的信息,再次登录后自动填充
			message.info('登录过期，请重新登录');
			localStorage.removeItem('token');
			sessionStorage.setItem('add', JSON.stringify(body));
			naviagte('/auth');
		}
		// console.log(imgList,'img--')
		// console.log(body,'body--')
		addNote(body);
	};

	const getPicSignRequest = async () => {
		const [err, res]: [any, signData] = await getPicSign();
		if (!err && res) {
			setOSSData(res);
		}
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
			await getPicSignRequest();
		}

		const suffix = file.name.slice(file.name.lastIndexOf('.'));
		const filename = Date.now() + suffix;
		// @ts-ignore
		file.url = OSSData.dir + filename;

		return file;
	};

	useEffect(() => {
		getPicSignRequest();
	}, []);

	return (
		<div className="add">
			<Form onFinish={handleSubmit}>
				<Upload
					action={OSSData?.host}
					listType="picture-card"
					fileList={imgList}
					onPreview={handlePreview}
					onChange={handleChange}
					onRemove={handleRemove}
					data={getExtraData}
					beforeUpload={beforeUpload}
				>
					{imgList.length >= 3 ? null : <>+</>}
				</Upload>

				<Modal
					open={previewOpen}
					title={previewTitle}
					footer={null}
					onCancel={handleCancel}
				>
					<img alt="example" style={{ width: '100%' }} src={previewImg} />
				</Modal>
				<Form.Item
					name={'title'}
					rules={[{ required: true, message: '请填写您的笔记标题' }]}
				>
					<Input
						placeholder="填写一个引人入胜的标题吧"
						showCount
						maxLength={100}
						defaultValue={temBody.title}
						bordered={false}
						style={{ marginTop: '2rem' }}
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					name={'context'}
					rules={[{ required: true, message: '请填写您的笔记内容' }]}
				>
					<Input.TextArea
						placeholder="介绍一下吧"
						showCount
						defaultValue={temBody.content}
						maxLength={300}
						autoSize
						bordered={false}
					/>
				</Form.Item>
				<Form.Item>
					<Button block style={{ marginTop: '4rem' }} htmlType={'submit'}>
						发布
					</Button>
				</Form.Item>

				<Footer />
			</Form>
		</div>
	);
}

export default Add;
