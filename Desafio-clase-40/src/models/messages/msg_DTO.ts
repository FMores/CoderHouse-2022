import { IMessage } from './msg.interfaces';

export class MessagesDTO {
	private id: string;
	private name: string;
	private surname: string;
	private age: number;
	private alias: string;
	private avatar: string;
	private text: string;
	private timestamp: string;

	constructor(message: IMessage) {
		{
			author: {
				this.id = message.email;
				(this.name = message.name),
					(this.surname = message.surname),
					(this.age = message.age),
					(this.alias = message.alias),
					(this.avatar = message.avatar);
			}
			(this.text = message.text), (this.timestamp = message.timestamp);
		}
	}
}
