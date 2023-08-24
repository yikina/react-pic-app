export interface authData {
	username: string;
	password: string;
}

export interface loginedData {
	accessToken: string;
	data: {
		username: string;
		avatar?: string;
		id: string;
	};
}
