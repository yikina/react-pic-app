export interface authData {
	username: string;
	password: string;
}

export interface loginedData {
	accessToken: string;
	user: {
		username?: string;
		avatar?: string;
		id: string;
		fan: number;
		following: number;
		insignia: number;
	};
}

export type userInfo = Omit<loginedData, 'user'> & {
	user: Omit<loginedData['user'], 'id'>;
};
