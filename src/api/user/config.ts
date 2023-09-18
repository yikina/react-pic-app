const { VIDEO_BASE_API_URL } = import.meta.env;

export default {
	baseURL: VIDEO_BASE_API_URL,
	register: 'user/register',
	login: 'user/login',
	update: 'user/update',
	coffees: 'coffees'
};
