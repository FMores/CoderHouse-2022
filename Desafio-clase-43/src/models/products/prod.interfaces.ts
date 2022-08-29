export interface IProduct {
	_id?: number;
	title: string;
	price: number;
	thumbnail: string;
	timestamp?: string;
	date?: string;
}

export interface IRead<T> {
	get(id?: number): Promise<T[]>;
}

export interface IWrite<T> {
	add(item: T): Promise<T[]>;
	update(id: number, item: T): Promise<boolean>;
	delete(id: number): Promise<boolean>;
}
