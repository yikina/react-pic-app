import { request } from '&/service';
import { updateBody } from '&/types';
import config from './config';

/**
 * 用户注册
 *@body {username:string,password:string}
 */
export const register = async (body: {
	username: string;
	password: string;
}) => {
	return request('POST', config.register, body);
};

/**
 * 用户登录
 * @body {username:string,password:string}
 */
export const login = async (body: { username: string; password: string }) => {
	return request('POST', config.login, body);
};

/**
 * 用户信息更新，必传，无更新则传空字符串
 * @body {id:string,nickname:string,avatar:string}
 */
export const update = async (body: updateBody, token: string) => {
	return request('PATCH', config.update, body, {}, token);
};
