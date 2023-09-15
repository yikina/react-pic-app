export interface authData {
	username: string;
	password: string;
}

export interface loginedData {
	accessToken: string;
	info: {
		username?: string;
		avatar?: string;
		id: string;
		fan: number;
		following: number;
		insignia: number;
	};
}
