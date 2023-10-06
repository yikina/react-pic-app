import { request } from '&/service';
import { addNoteData } from '&/types/file';
import axios from 'axios';
import config from './config';

/**
 * @description 获取oss上传signature
 *
 */
export const getPicSign = async (token: string) => {
	return request('GET', config.picSign, {}, {}, token);
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
export const addNote = async (body: addNoteData, token: string) => {
	return request('POST', config.addNote, body, {}, token);
};

/**
 * @description 获取用户头像上传oss signature
 */
export const getAvatarPicSign = async (token: string) => {
	return request('GET', config.avatarPicSign, {}, {}, token);
};

/**
 * @description 获取推荐笔记
 */
export const getRecommandNotes = async (skipNum: number) => {
	return request('GET', config.addNote, {}, { skip: skipNum });
};

/**
 * @description 搜索笔记标题
 */
export const searchNotes = async (keywords: string) => {
	return request('GET', config.searchNote, {}, { keyword: keywords });
};

/**
 * @description 获取用户发布的笔记
 */
export const getPosts = async (username: string, token: string) => {
	return request('GET', config.getPosts, {}, { username: username }, token);
};
