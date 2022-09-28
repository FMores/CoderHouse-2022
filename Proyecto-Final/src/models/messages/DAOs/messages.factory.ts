import { logger } from '../../../utils/winston.logger';
import { MongoDBMessagesDAO } from './mongodb.messages.dao';

export class MessagesFactory {
	static get(dbType: 'mongoDB_local' | 'mongoDB_atlas') {
		switch (dbType) {
			case 'mongoDB_local':
				logger.info('Starting persistence in Mongo_Local for products');
				return new MongoDBMessagesDAO(dbType);
			default:
				logger.info('Starting persistence in Mongo_Atlas for products');
				return new MongoDBMessagesDAO(dbType);
		}
	}
}