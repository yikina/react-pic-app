import { loginedData } from '&/types';

export const useUserInfo = () => {
	const jsonString = localStorage.getItem('user');
	const user: loginedData = (jsonString && JSON.parse(jsonString)) || '';

	// 在localStorage中存储用户信息
	const saveuser = (user: loginedData) => {
		const userString = JSON.stringify(user);
		localStorage.setItem('user', userString);
	};
	//修改用户信息
	const updateuser = (newUser: loginedData['info']) => {
		const preUser = JSON.parse(localStorage.getItem('user') || '');
		const newUserString = JSON.stringify({ ...preUser, info: newUser });
		localStorage.setItem('user', newUserString);
	};

	// 清空用户信息
	const deleteuser = () => {
		localStorage.removeItem('user');
	};

	return {
		user,
		saveuser,
		deleteuser,
		updateuser
	};
};
