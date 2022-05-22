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
	code: number | string;
	stock: number;
	price: number;
	thumbnail: string;
	timestamp?: string;
}

export interface CommonMethodsDAO {
	get(id?: string | undefined): Promise<ProductI[] | undefined>;
	add(data: NewProductI): Promise<ProductI>;
	update(id: string, newProductData: NewProductI): Promise<ProductI>;
	delete(id: string): Promise<void>;
}

export interface ProductBaseClassFirebase {
	get(id?: string | undefined): Promise<ProductI[]>;
	add(data: NewProductI): Promise<void>;
	update(id: string, newProductData: NewProductI): Promise<ProductI>;
	delete(id: string): Promise<void>;
}

export enum PercistenceType {
	Memory = 'Memory',
	FileSystem = 'FSystem',
	MySQL = 'MySQL',
	SQLite3 = 'SQLite3',
	Mongo = 'Mongo',
	Mongo_Atlas = 'Mongo_Atlas',
	FireBase = 'FireBase',
}
