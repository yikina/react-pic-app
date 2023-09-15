import { loginedData } from '&/types';

export const useUserInfo = () => {
	const jsonString = localStorage.getItem('user');
	const user = (jsonString && JSON.parse(jsonString)) || '';

	// 在localStorage中存储用户信息
	const saveuser = (user: loginedData) => {
		const userString = JSON.stringify(user);
		localStorage.setItem('user', userString);
	};

	// 清空用户信息
	const deleteuser = () => {
		localStorage.removeItem('user');
	};

	return {
		user,
		saveuser,
		deleteuser
	};
};
