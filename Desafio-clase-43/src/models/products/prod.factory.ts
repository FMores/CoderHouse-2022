import { ProductFsDAO } from './prod.fs.DAO';
import path from 'path';
import { logger } from '../../utils/winston.logger';
import { PersistenceType } from '../generics.interfaces';
import { ProductMongoDAO } from './prod.mongo.DAO';

export class ProductFactory {
	static get(type?: PersistenceType) {
		switch (type) {
			case PersistenceType.Mongo:
				logger.info('Starting persistence in Mongo_Local for products');
				return new ProductMongoDAO();
			case PersistenceType.Mongo_Atlas:
				logger.info('Starting persistence in Mongo_Atlas for products');
				return new ProductMongoDAO();
			default:
				PersistenceType.FileSystem;
				logger.info('Starting local file persistence for products');
				const fileLocation = path.resolve(__dirname, '../db/products.json');
				return new ProductFsDAO(fileLocation);
		}
	}
}
