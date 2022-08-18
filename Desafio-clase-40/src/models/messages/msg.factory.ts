import { FireBaseMsgDAO } from './msg.FireBase.DAO';
import { MsgMongoDAO } from './msg.Mongo.DAO';
import { logger } from '../../utils/winston.logger';
import { PersistenceType } from '../generics.interfaces';

export class MessagesFactory {
	static get(type?: PersistenceType) {
		switch (type) {
			case PersistenceType.Mongo:
				logger.info('Starting persistence in Mongo_Local for messages');
				return new MsgMongoDAO();
			default:
				PersistenceType.Mongo_Atlas;
				logger.info('Starting persistence in Mongo_Atlas for messages');
				return new MsgMongoDAO();
		}
	}
}
