import { logger } from '../../../utils/winston.logger';
import { MongoDBCartsDAO } from './mongodb.carts.dao';

export class CartsFactory {
	static get(dbType: 'mongoDB_local' | 'mongoDB_atlas') {
		switch (dbType) {
			case 'mongoDB_local':
				logger.info('Starting persistence in Mongo_Local for products');
				return new MongoDBCartsDAO(dbType);
			default:
				logger.info('Starting persistence in Mongo_Atlas for products');
				return new MongoDBCartsDAO(dbType);
		}
	}
}
