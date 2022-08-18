import { CommonMethodsDAO } from './generics.interfaces';
import { IRead, IWrite } from './products/prod.interfaces';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
	constructor(private dao: CommonMethodsDAO<T>) {
		this.dao = dao;
	}
	async get(id?: number): Promise<T[]> {
		return this.dao.get(id);
	}
	async add(item: T): Promise<T[]> {
		return this.dao.add(item);
	}
	async update(id: number, item: T): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	async delete(id: number): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
