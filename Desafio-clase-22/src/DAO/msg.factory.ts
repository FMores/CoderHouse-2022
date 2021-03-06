import { MsgFileSystemDAO } from './msg.Fs.DAO';
import { FireBaseMsgDAO } from './msg.FireBase.DAO';
import { MsgMongoDAO } from './msg.Mongo.DAO';
import { PersistenceType } from './interfaces';
import path from 'path';

export class MsgFactory {
	static get(type?: PersistenceType) {
		switch (type) {
			case PersistenceType.Mongo:
				console.log('Starting persistence in Mongo_Local for messages');
				return new MsgMongoDAO(PersistenceType.Mongo);
			case PersistenceType.Mongo_Atlas:
				console.log('Starting persistence in Mongo_Atlas for messages');
				return new MsgMongoDAO(PersistenceType.Mongo_Atlas);
			case PersistenceType.FireBase:
				console.log('Starting persistence in FireBase for messages');
				return new FireBaseMsgDAO();
			default:
				PersistenceType.FileSystem;
				console.log('Starting local file persistence for messages');
				const fileLocation = path.resolve(__dirname, '../db/messages.json');
				return new MsgFileSystemDAO(fileLocation);
		}
	}
}
