import { ProductMongoDAO } from './product.Mongo.DAO';
import { logger } from '../../utils/winston.logger';
import { ProductFsDAO } from './product.fs.DAO';
import { PersistenceType } from '../interfaces';
import path from 'path';

export class ProductFactory {
	static get(type?: PersistenceType) {
		switch (type) {
			case PersistenceType.Mongo:
				logger.info('Starting persistence in Mongo_Local for products');
				return new ProductMongoDAO(PersistenceType.Mongo);
			case PersistenceType.Mongo_Atlas:
				logger.info('Starting persistence in Mongo_Atlas for products');
				return new ProductMongoDAO(PersistenceType.Mongo_Atlas);
			default:
				PersistenceType.FileSystem;
				logger.info('Starting local file persistence for products');
				const fileLocation = path.resolve(__dirname, '../db/products.json');
				return new ProductFsDAO(fileLocation);
		}
	}
}
