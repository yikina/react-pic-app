export interface authData {
	username: string;
	password: string;
}

export interface loginedData {
	accessToken: string;
	info: {
		username?: string;
		nickname?: string;
		avatar?: string | null;
		id: string;
		fan: number;
		following: number;
		insignia: number;
	};
}

export interface updateBody {
	id: string;
	nickname: string;
	avatar: string;
}

export type picObj = {
	url: string;
	width: number;
	height: number;
	hwscale: number;
};

export interface notesData {
	id: string;
	title: string;
	content: string;
	pic: picObj[];
	collection: number;
	user: loginedData['info'];
}
