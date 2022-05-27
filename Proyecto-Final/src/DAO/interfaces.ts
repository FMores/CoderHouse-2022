export interface NewProductI {
	_id?: string;
	name: string;
	description: string;
	code?: number;
	price: number;
	stock: number;
	thumbnail: string;
	timestamp?: string;
}

export interface ProductI {
	_id: string;
	name: string;
	description: string;
	stock: number;
	price: number;
	thumbnail: string;
	timestamp?: string;
}

export interface CommonMethodsDAO {
	get(id?: string): Promise<ProductI[]>;
	add(data: NewProductI): Promise<ProductI>;
	update(id: string, newProductData: NewProductI): Promise<ProductI | null>;
	delete(id: string): Promise<null | undefined>;
}

export interface ProductBaseClassFirebase {
	get(id?: string | undefined): Promise<ProductI[]>;
	add(data: NewProductI): Promise<void>;
	update(id: string, newProductData: NewProductI): Promise<ProductI>;
	delete(id: string): Promise<void>;
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
