import path from 'path';
import { PersistenceType } from '../../config/interfaces';
import { logger } from '../../utils/winston.logger';
import { CartFileSystemDAO } from './FileSystem.DAO';
import { FireBaseCartDAO } from './FireBase.DAO';
import { MemoryCartDAO } from './LocalMemory.DAO';
import { CartMongoDAO } from './Mongo.DAO';
import { MysqlCartDAO } from './MySQL.DAO';
import { Sqlite3CartDAO } from './SQLite3.DAO';

export class CartFactoryDAO {
	static get(type: PersistenceType) {
		switch (type) {
			case PersistenceType.FileSystem:
				logger.info('Starting local file persistence for cart');
				const fileLocation = path.resolve(__dirname, '../../DB/cartDB.json');
				return new CartFileSystemDAO(fileLocation);
			case PersistenceType.Mongo:
				logger.info('Starting persistence in Mongo_Local for cart');
				return new CartMongoDAO(PersistenceType.Mongo);
			case PersistenceType.Mongo_Atlas:
				logger.info('Starting persistence in Mongo_Atlas for cart');
				return new CartMongoDAO(PersistenceType.Mongo_Atlas);
			case PersistenceType.MySQL:
				logger.info('Starting persistence in MySQL for cart');
				return new MysqlCartDAO(PersistenceType.MySQL);
			case PersistenceType.SQLite3:
				logger.info('Starting persistence in SQLite3 for cart');
				return new Sqlite3CartDAO(PersistenceType.SQLite3);
			case PersistenceType.FireBase:
				logger.info('Starting persistence in FireBase for cart');
				return new FireBaseCartDAO();
			default:
				PersistenceType.Memory;
				logger.info('Starting persistence in Local Memory for cart');
				return new MemoryCartDAO();
		}
	}
}
