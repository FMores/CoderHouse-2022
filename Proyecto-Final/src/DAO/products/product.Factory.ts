import path from 'path';
import { PersistenceType } from '../interfaces';
import { FileSystemDAO } from './product.FileSystem.DAO';
import { FireBaseDAO } from './product.FireBase.DAO';
import { MemoryDAO } from './product.in.MemoryDAO';
import { MongoDAO } from './product.Mongo.DAO';
import { MysqlDAO } from './product.MySQL.DAO';
import { Sqlite3DAO } from './product.SQLite3.DAO';

export class ProductFactoryDAO {
	static get(type: PersistenceType) {
		switch (type) {
			case PersistenceType.FileSystem:
				console.log('Starting local file persistence for products');
				const fileLocation = path.resolve(__dirname, '../../DB/productDB.json');
				return new FileSystemDAO(fileLocation);
			case PersistenceType.Mongo:
				console.log('Starting persistence in Mongo_Local for products');
				return new MongoDAO(PersistenceType.Mongo);
			case PersistenceType.Mongo_Atlas:
				console.log('Starting persistence in Mongo_Atlas for products');
				return new MongoDAO(PersistenceType.Mongo_Atlas);
			case PersistenceType.MySQL:
				console.log('Starting persistence in MySQL for products');
				return new MysqlDAO(PersistenceType.MySQL);
			case PersistenceType.SQLite3:
				console.log('Starting persistence in SQLite3 for products');
				return new Sqlite3DAO(PersistenceType.SQLite3);
			case PersistenceType.FireBase:
				console.log('Starting persistence in FireBase for products');
				return new FireBaseDAO();
			default:
				PersistenceType.Memory;
				console.log('Starting persistence in Local Memory for products');
				return new MemoryDAO();
		}
	}
}
