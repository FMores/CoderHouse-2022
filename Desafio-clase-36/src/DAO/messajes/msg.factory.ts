import { FireBaseMsgDAO } from './msg.FireBase.DAO';
import { MsgMongoDAO } from './msg.Mongo.DAO';
import { PersistenceType } from '../interfaces';
import path from 'path';
import { logger } from '../../utils/winston.logger';

export class MsgFactory {
	static get(type?: PersistenceType) {
		switch (type) {
			case PersistenceType.Mongo:
				logger.info('Starting persistence in Mongo_Local for messages');
				return new MsgMongoDAO(PersistenceType.Mongo);

			case PersistenceType.FireBase:
				logger.info('Starting persistence in FireBase for messages');
				return new FireBaseMsgDAO();
			default:
			case PersistenceType.Mongo_Atlas:
				logger.info('Starting persistence in Mongo_Atlas for messages');
				return new MsgMongoDAO(PersistenceType.Mongo_Atlas);
		}
	}
}
