import axios, { AxiosResponse } from 'axios';
import { handleRequestHeader, handleNetworkError } from './tools';

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

axios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(err) => {
		console.log(err, 'err--');
		handleNetworkError(err.response.status);
		return Promise.reject(err.response.data);
	}
);

export const request = <T>(
	method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
	url: string,
	data: IAnyObject,
	params: IAnyObject = {},
	clearFn?: IFn
): Promise<IResponse<T>> => {
	return new Promise((resolve, reject) => {
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
				requestPromise = axios.delete(url, { params });
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
				reject(new Error('Unsupported method'));
				return;
			}
		}

		requestPromise
			.then((result) => {
				let res: IResponse<T>;
				if (clearFn !== undefined) {
					res = clearFn(result.data) as unknown as IResponse<T>;
				} else {
					res = result.data as IResponse<T>;
				}
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
