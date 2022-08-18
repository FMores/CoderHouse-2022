import fs from 'fs/promises';
import { date_creator } from '../../utils/date.creator';
import { CommonMethodsDAO } from '../generics.interfaces';
import { IProduct } from './prod.interfaces';

export class ProductFsDAO implements CommonMethodsDAO<IProduct> {
	private filePath: string;

	constructor(fileLocation: string) {
		this.filePath = fileLocation;
	}

	private async fileStat(): Promise<import('fs').Stats> {
		const fileStats = await fs.stat(this.filePath);
		if (fileStats.size === 0) {
			await fs.writeFile(this.filePath, JSON.stringify([]));
			const fileInitialized = await fs.stat(this.filePath);
			return fileInitialized;
		}
		return fileStats;
	}

	private async readFile() {
		await this.fileStat();
		const dataStr = await fs.readFile(this.filePath, 'utf8');
		const dataObj = JSON.parse(dataStr);
		return dataObj;
	}

	private async writeFile(data: any) {
		await fs.writeFile(this.filePath, JSON.stringify(data, null, '\t'));
	}

	async get(id?: number): Promise<IProduct[]> {
		try {
			return [{ _id: 3, title: 'camisa', price: 3, thumbnail: 'foto-camisa' }];
		} catch (error) {
			throw new Error('Method not implemented.');
		}
	}
	add(data: IProduct): Promise<IProduct[]> {
		throw new Error('Method not implemented.');
	}
	update(id: number, newProductData: IProduct): Promise<IProduct[]> {
		throw new Error('Method not implemented.');
	}
	delete(id: number): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
