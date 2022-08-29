import { CommonMethodsDAO } from './generics.interfaces';
import { IRead, IWrite } from './products/prod.interfaces';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
	constructor(private dao: CommonMethodsDAO<T>, private dto: any) {
		this.dao = dao;
	}

	async get(id?: number): Promise<T[]> {
		const dataFromDAO = await this.dao.get(id);

		if (dataFromDAO.length === 1) {
			const dataByIdDTO = new this.dto(dataFromDAO);
			return dataByIdDTO;
		}

		const allDataDTO = dataFromDAO.map((aData: T) => new this.dto(aData));
		return allDataDTO;
	}

	async add(item: T): Promise<T[]> {
		const newDataFromDTO = new this.dto(item);
		return this.dao.add(newDataFromDTO);
	}

	async update(id: number, item: T): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async delete(id: number): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
