import path from 'path';
import { PercistenceType } from '../interfaces';
import { FileSystemDAO } from './fileSystemDAO';
import { MemoryDAO } from './memoryDAO';

export class ProductFactoryDAO {
	static get(type: PercistenceType) {
		switch (type) {
			case PercistenceType.FileSystem:
				console.log('Starting persistence on FileSystem');
				const fileLocation = path.resolve(__dirname, '../../DB/productDB.json');
				return new FileSystemDAO(fileLocation);
			default:
				PercistenceType.Memory;
				console.log('Starting persistence on Memory');
				return new MemoryDAO();
		}
	}
}
