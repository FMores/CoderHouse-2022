import path from 'path';
import { PersistenceType } from '../interfaces';
import { FileSystemDAO } from './fileSystemDAO';
import { MemoryDAO } from './memoryDAO';
import { MongoDAO } from './mongoDAO';
import { MysqlDAO } from './mysqlDAO';
import { Sqlite3DAO } from './sqlite3DAO';

export class ProductFactoryDAO {
	static get(type: PersistenceType) {
		switch (type) {
			case PersistenceType.FileSystem:
				console.log('Starting local file persistence');
				const fileLocation = path.resolve(__dirname, '../../DB/productDB.json');
				return new FileSystemDAO(fileLocation);
			case PersistenceType.Mongo:
				console.log('Starting persistence in Mongo_Local');
				return new MongoDAO(PersistenceType.Mongo);
			case PersistenceType.Mongo_Atlas:
				console.log('Starting persistence in Mongo_Atlas');
				return new MongoDAO(PersistenceType.Mongo_Atlas);
			case PersistenceType.MySQL:
				console.log('Starting persistence in MySQL');
				return new MysqlDAO(PersistenceType.MySQL);
			case PersistenceType.SQLite3:
				console.log('Starting persistence in SQLite3');
				return new Sqlite3DAO(PersistenceType.SQLite3);
			default:
				PersistenceType.Memory;
				console.log('Starting persistence in Local Memory');
				return new MemoryDAO();
		}
	}
}
