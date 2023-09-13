import Footer from '&/components/Footer';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import temPic from '&/assets/temPic';
import { Button, Divider, Input, Modal, Upload } from 'antd';
import './index.scss';
import { deletePic, getPicSign } from '&/api/files';
import { signData } from '&/types/file';

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

function Add() {
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
