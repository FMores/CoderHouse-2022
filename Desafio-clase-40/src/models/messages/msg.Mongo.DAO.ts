import { MongoDBSingleton } from '../../services/Mongo.Service';
import mongodbMessageModel from '../../models/messages/mongo.msg.model';
import { date_creator } from '../../utils/date.creator';
import { IMessage } from './msg.interfaces';
import { CommonMethodsDAO } from '../generics.interfaces';

export class MsgMongoDAO implements CommonMethodsDAO<IMessage> {
	private msg: any;

	constructor() {
		this.msg = mongodbMessageModel;
		this.initMongo();
	}

	private async initMongo(id?: number) {
		MongoDBSingleton.getInstance();
	}

	async get() {
		return await this.msg.find();
	}

	// public async add(msg_data: IMessage) {
	// 	const date = await date_creator();

	// 	const msgToSave = {
	// 		author: {
	// 			id: msg_data.email,
	// 			name: msg_data.name,
	// 			surname: msg_data.surname,
	// 			age: msg_data.age,
	// 			alias: msg_data.alias,
	// 			avatar: msg_data.avatar,
	// 		},
	// 		text: msg_data.text,
	// 		timestamp: date,
	// 	};

	// 	const newMsg = new this.msg(msgToSave);

	// 	await newMsg.save();
	// }
	async add(data: IMessage): Promise<IMessage[]> {
		const timestamp = await date_creator();
	}

	async update(id: number, newProductData: IMessage): Promise<IMessage[]> {
		throw new Error('Method not implemented.');
	}
	async delete(id: number): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
