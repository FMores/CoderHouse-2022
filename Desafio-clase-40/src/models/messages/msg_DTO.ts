import { IMessage, IMessageDB } from './msg.interfaces';

export class MessagesDTO {
	readonly id: string;
	readonly name: string;
	readonly surname: string;
	readonly age: number;
	readonly alias: string;
	readonly avatar: string;
	readonly text: string;
	readonly timestamp?: string;

	constructor(message: IMessage) {
		this.id = message.email;
		this.name = message.name;
		this.surname = message.surname;
		this.age = message.age;
		this.alias = message.alias;
		this.avatar = message.avatar;
		this.text = message.text;
		this.timestamp = message.timestamp;
	}
}
