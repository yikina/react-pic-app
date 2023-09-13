import { proxy } from 'valtio';
import { userInfo } from '&/types';
import _ from 'lodash';

const initialUserInfo: userInfo = {
	accessToken: '',
	user: {
		username: '',
		avatar: '',
		fan: 0,
		following: 0,
		insignia: 0
	}
};

export const state = proxy<userInfo>(initialUserInfo);

export const saveUserInfo = (newInfo: userInfo) => {
	state.user = _.cloneDeep(newInfo.user);
};

export const clearUserInfo = () => {
	state.user = _.cloneDeep(initialUserInfo.user);
};
