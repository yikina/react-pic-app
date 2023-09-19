export interface signData {
	accessId: string;
	policy: string;
	signature: string;
	dir: string;
	host: string;
	expire: string;
}

export interface addNoteData {
	title: string;
	content: string;
	pic: string;
	user_id: string | undefined;
}
