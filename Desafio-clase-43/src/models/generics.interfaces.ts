export interface CommonMethodsDAO<T> {
	get(id?: number): Promise<T[]>;
	add(data: T): Promise<T[]>;
	update(id: number, newProductData: T): Promise<T[]>;
	delete(id: number): Promise<boolean>;
}

export enum PersistenceType {
	Memory = 'Memory',
	FileSystem = 'FSystem',
	MySQL = 'MySQL',
	SQLite3 = 'SQLite3',
	Mongo = 'Mongo',
	Mongo_Atlas = 'Mongo_Atlas',
	FireBase = 'FireBase',
}
