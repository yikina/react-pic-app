import { request } from '&/service';
import { addNoteData } from '&/types/file';
import axios from 'axios';
import config from './config';

/**
 * @description 获取oss上传signature
 *
 */
export const getPicSign = async () => {
	return request('GET', config.picSign, {});
};

/**
 * @description 删除oss中存储的图片
 */
export const deletePic = (
	objectName: string | undefined,
	sign: string | undefined
) => {
	axios
		.delete(`/${objectName}`, {
			baseURL: config.ossUrl,
			headers: {
				Authorization: sign
			}
		})
		.then(() => {
			return;
		})
		.catch((error) => {
			console.error(error);
		});
};

/**
 * @description 发布笔记
 * @body addNoteData
 */
export const addNote = async (body: addNoteData) => {
	return request('POST', config.addNote, body);
};
