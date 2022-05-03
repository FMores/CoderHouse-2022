import { date_creator } from '../utils/date';
import { code_creator } from '../utils/uuid';
import fs from 'fs/promises';
import path from 'path';

interface IProduct {
	id?: string | number;
	name: string;
	price: number;
	thumbnail: string;
	description: string;
	code?: number | string;
	stock: number;
	timestamp?: string;
}

class Product_persistence {
	constructor(
		private fileName: string,
		private filePath = path.resolve(__dirname, `../db/${fileName}`),
	) {}

	private fileStat = async () => {
		const fileStats = await fs.stat(this.filePath);
		if (fileStats.size === 0) {
			await fs.writeFile(this.filePath, JSON.stringify([]));
			const fileInitialized = await fs.stat(this.filePath);
			return fileInitialized;
		}
		return fileStats;
	};

	private readFile = async () => {
		await this.fileStat();
		const dataStr = await fs.readFile(this.filePath, 'utf8');
		const dataObj = JSON.parse(dataStr);
		return dataObj;
	};

	private writeFile = async (data: IProduct[]) => {
		await fs.writeFile(this.filePath, JSON.stringify(data, null, '\t'));
	};

	public getAll = async () => {
		try {
			await this.fileStat();
			const current_product_list = await this.readFile();

			if (current_product_list.length > 0) {
				return current_product_list;
			} else {
				return null;
			}
		} catch (err: any) {
			throw Error(err);
		}
	};

	public getById = async (id: string) => {
		try {
			await this.fileStat();
			const data = await this.readFile();
			const productById = data.filter((e: IProduct) => e.id === id);
			if (productById.length > 0) {
				return productById[0];
			} else {
				return null;
			}
		} catch (err: any) {
			throw Error(err);
		}
	};

	public save = async (new_data: IProduct) => {
		try {
			const stats = await this.fileStat();
			const timestamp = await date_creator();
			const product_id = await code_creator();
			const product_code = await code_creator();

			if (stats.size > 2) {
				const current_product_list = await this.readFile();
				const new_product = {
					id: `PID-${product_id}`,
					code: `PC-${product_code}`,
					timestamp,
					...new_data,
				};

				current_product_list.push(new_product);

				await this.writeFile(current_product_list);

				return new_product;
			} else {
				const initial_product = {
					id: `PID-${product_id}`,
					code: `PC-${product_code}`,
					timestamp,
					...new_data,
				};

				const initial_array_of_data = [initial_product];

				await this.writeFile(initial_array_of_data);

				return initial_product;
			}
		} catch (err: any) {
			throw Error(err);
		}
	};

	public updateById = async (data: IProduct) => {
		const { id } = data;
		const newData: any = { ...data };

		try {
			await this.fileStat();

			const current_product_list = await this.readFile();
			const product_index = current_product_list.findIndex((el: IProduct) => el.id === id);

			if (product_index !== -1) {
				let prod_to_update = current_product_list[product_index];

				for (let val in newData) {
					if (newData[val]) {
						prod_to_update[val] = newData[val];
					}
				}

				current_product_list.splice(product_index, 1, prod_to_update);

				this.writeFile(current_product_list);

				return prod_to_update;
			} else {
				return `No existe el ID: ${id}`;
			}
		} catch (err: any) {
			throw Error(err);
		}
	};

	public deleteById = async (id: string) => {
		try {
			await this.fileStat();

			const current_product_list = await this.readFile();

			if (current_product_list.length === 0) {
				throw Error('El archivo se encuentra vacio');
			}

			const checkId = current_product_list.find((e: IProduct) => e.id === id);

			if (checkId) {
				const filtered_product_list = current_product_list.filter((e: IProduct) => e.id !== id);
				await fs.writeFile(this.filePath, JSON.stringify(filtered_product_list, null, '\t'));
				return 'successfull';
			} else {
				throw Error(`No existe el ID: ${id}`);
			}
		} catch (err: any) {
			throw Error(err);
		}
	};
}

export const product_persistence = new Product_persistence('products.txt');
