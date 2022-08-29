export interface IMessage {
	id?: number | string;
	email: string;
	name: string;
	surname: string;
	age: number;
	alias: string;
	avatar: string;
	text: string;
	timestamp?: string;
}

export interface IMessageDB {
	author: {
		email: string;
		name: string;
		surname: string;
		age: number;
		alias: string;
		avatar: string;
	};
	text: string;
	timestamp: string;
}
