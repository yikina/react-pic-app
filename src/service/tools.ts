import { message } from 'antd';

export const handleRequestHeader = (config: any) => {
	config['Content-Type'] = 'application/json;charset=utf-8';
	config['timeout'] = 60000;
	return config;
};

export const handleNetworkError = (
	errStatus?: number,
	errmsg?: string
): void => {
	const networkErrMap: any = {
		'401': '未授权，请重新登录',
		'403': '拒绝访问',
		'404': '请求错误，未找到该资源',
		'405': '请求方法未允许',
		'408': '请求超时',
		'500': '服务器端出错',
		'501': '网络未实现',
		'502': '网络错误',
		'503': '服务不可用',
		'504': '网络超时',
		'505': 'http版本不支持该请求'
	};
	if (errStatus) {
		message.error(networkErrMap[errStatus] ?? `错误: ${errmsg}`);
		return;
	}

	message.error('无法连接到服务器！');
};

export const handleGeneralError = (
	statusCode: string,
	errmsg: string
): boolean => {
	if (statusCode !== '0') {
		message.error(errmsg);
		return false;
	}

	return true;
};
