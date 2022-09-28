import { mongoDBConnection } from '../../../services/mongodb.service';
import { date_creator } from '../../../utils/date';
import { IMessage } from '../messages.interface';
import mongodbMessageModel from '../mongo.msg.model';

export class MongoDBMessagesDAO {
	private db: any;

	constructor(private readonly dataBase: 'mongoDB_local' | 'mongoDB_atlas') {
		this.db = mongodbMessageModel;
	}

	public async get() {
		return await this.db.find();
	}

	public async add(msg_data: IMessage) {
		const date = await date_creator();

		const msgToSave = {
			author: {
				email: msg_data.email,
				name: msg_data.name,
				surname: msg_data.surname,
				age: msg_data.age,
				alias: msg_data.alias,
				avatar: msg_data.avatar,
			},
			text: msg_data.text,
			timestamp: date,
		};

		const newMsg = new this.db(msgToSave);

		await newMsg.save();
	}
}
