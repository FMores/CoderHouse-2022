import path from 'path';
import { PersistenceType } from '../interfaces';
import { CartFileSystemDAO } from './cart.FileSystem.DAO';
import { FireBaseCartDAO } from './cart.FireBase.DAO';
import { MemoryCartDAO } from './cart.in.Memory.DAO';
import { CartMongoDAO } from './cart.Mongo.DAO';
import { MysqlCartDAO } from './cart.MySQL.DAO';
import { Sqlite3CartDAO } from './cart.SQLite3.DAO';

export class CartFactoryDAO {
	static get(type: PersistenceType) {
		switch (type) {
			case PersistenceType.FileSystem:
				console.log('Starting local file persistence for cart');
				const fileLocation = path.resolve(__dirname, '../../DB/cartDB.json');
				return new CartFileSystemDAO(fileLocation);
			case PersistenceType.Mongo:
				console.log('Starting persistence in Mongo_Local for cart');
				return new CartMongoDAO(PersistenceType.Mongo);
			case PersistenceType.Mongo_Atlas:
				console.log('Starting persistence in Mongo_Atlas for cart');
				return new CartMongoDAO(PersistenceType.Mongo_Atlas);
			case PersistenceType.MySQL:
				console.log('Starting persistence in MySQL for cart');
				return new MysqlCartDAO(PersistenceType.MySQL);
			case PersistenceType.SQLite3:
				console.log('Starting persistence in SQLite3 for cart');
				return new Sqlite3CartDAO(PersistenceType.SQLite3);
			case PersistenceType.FireBase:
				console.log('Starting persistence in FireBase for cart');
				return new FireBaseCartDAO();
			default:
				PersistenceType.Memory;
				console.log('Starting persistence in Local Memory for cart');
				return new MemoryCartDAO();
		}
	}
}
