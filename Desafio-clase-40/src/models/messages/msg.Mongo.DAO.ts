import { MongoDBSingleton } from '../../services/Mongo.Service';
import mongodbMessageModel from '../../models/messages/mongo.msg.model';
import { date_creator } from '../../utils/date.creator';
import { IMessage, IMessageDB } from './msg.interfaces';
import { CommonMethodsDAO } from '../generics.interfaces';
import { MessagesDTO } from './msg_DTO';
import { database } from 'firebase-admin';

export class MsgMongoDAO implements CommonMethodsDAO<IMessage> {
	private msg: typeof mongodbMessageModel;

	constructor() {
		this.msg = mongodbMessageModel;
		this.initMongo();
	}

	private async initMongo() {
		MongoDBSingleton.getInstance();
	}

	async get(id?: number): Promise<IMessage[]> {
		const messagesFromDB = await this.msg.find();

		const messages: IMessage[] = [];

		messagesFromDB.forEach((aMessage: IMessageDB) => {
			const {
				text,
				timestamp,
				author: { ...author },
			} = aMessage;
			messages.push({ ...author, text, timestamp });
		});

		return messages;
	}

	async add(data: IMessage): Promise<IMessage[]> {
		const timestamp = await date_creator();

		const newMessage = {
			author: {
				email: data.id,
				name: data.name,
				surname: data.surname,
				age: data.age,
				alias: data.alias,
				avatar: data.avatar,
			},
			text: data.text,
			timestamp,
		};

		const msgToSave = new this.msg(newMessage);

		await msgToSave.save();

		return [];
	}

	async update(id: number, newProductData: IMessage): Promise<IMessage[]> {
		throw new Error('Method not implemented.');
	}
	async delete(id: number): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
