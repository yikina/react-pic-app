import Footer from '&/components/Footer';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';
import temPic from '&/assets/temPic';
import { Button, Divider, Input, Modal, Upload } from 'antd';
import './index.scss';

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

function Add() {
	//上传img
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImg, setPreviewImg] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
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

		setPreviewImg(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
		);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
		setImgList(newFileList);

	return (
		<div className="add">
			<Upload
				action=" "
				listType="picture-card"
				fileList={imgList}
				onPreview={handlePreview}
				onChange={handleChange}
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
			<Input
				placeholder="填写一个引人入胜的标题吧"
				bordered={false}
				style={{ marginTop: '2rem' }}
			/>
			<Divider />
			<Input.TextArea placeholder="介绍一下吧" autoSize bordered={false} />
			<Button block style={{ marginTop: '4rem' }}>
				发布
			</Button>

			<Footer />
		</div>
	);
}

export default Add;
