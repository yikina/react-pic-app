import { request } from '&/service';
import config from './config';

/**
 * 获取咖啡
 *
 */
export const getCoffees = async () => {
	return request('GET', config.coffees, {});
};

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
