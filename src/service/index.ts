import axios, { AxiosResponse } from 'axios';
import {
	handleRequestHeader,
	handleGeneralError,
	handleNetworkError
} from './tools';
/**
 * @description: wrap axios request
 * @use const [err, res] = await request('GET', url, {});
 */

export interface IResponse<T> {
	data: T;
	statusCode: string;
	message: string;
}

export interface IAnyObject {
	[index: string]: unknown;
}

export type IFn = (data: IResponse<any>) => unknown;

// axios baseURL
const { VITE_BASE_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_API_URL;

axios.interceptors.request.use(
	(config) => {
		config = handleRequestHeader(config);
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

const successCode = [200, 201, 204];
axios.interceptors.response.use(
	(response) => {
		//!response.data.statusCode为了适配OSS图片删除无返回值的情况
		if (successCode.includes(response.data.statusCode as number)) {
			return response.data;
		} else if (!response.data.statusCode) {
			return;
		} else {
			handleGeneralError(response.data.statusCode, response.data.message);
		}
	},
	(err) => {
		handleNetworkError(err.response.status, err.response.data.message);
		return Promise.reject(err.response.data);
	}
);

export const request = (
	method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
	url: string,
	data: IAnyObject,
	params: IAnyObject = {},
	clearFn?: IFn
): Promise<[any, any]> => {
	return new Promise((resolve) => {
		let requestPromise: Promise<AxiosResponse>;

		switch (method) {
			case 'GET': {
				requestPromise = axios.get(url, { params });
				break;
			}
			case 'POST': {
				requestPromise = axios.post(url, data, { params });
				break;
			}
			case 'DELETE': {
				requestPromise = axios.delete(url, { data, params });
				break;
			}
			case 'PUT': {
				requestPromise = axios.put(url, data, { params });
				break;
			}
			case 'PATCH': {
				requestPromise = axios.patch(url, data, { params });
				break;
			}
			default: {
				resolve([new Error('Unsupported method'), undefined]);
				return;
			}
		}

		requestPromise
			.then((result) => {
				let res: any;
				if (clearFn !== undefined) {
					res = clearFn(result.data);
				} else {
					res = result.data;
				}
				resolve([null, res]);
			})
			.catch((err) => {
				resolve([err, undefined]);
			});
	});
};
