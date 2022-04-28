import fs from 'fs/promises';
import path from 'path';

interface IProduct {
	id?: number;
	title: string;
	price: number;
	thumbnail: string;
}

class Container {
	constructor(private fileName: string, private filePath = path.resolve(__dirname, `../db/${fileName}`)) {}

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
			const data = await this.readFile();
			if (data.length > 0) {
				return data;
			} else {
				return null;
			}
		} catch (err: any) {
			if (err.code === 'ENOENT') {
				console.log(`No existe el archivo especificado o el nombre es incorrecto => ${this.fileName}`);
			} else {
				console.log(err);
			}
		}
	};

	public save = async (newProduct: IProduct) => {
		if (
			!(newProduct['title'] || typeof newProduct['title'] === 'string') ||
			!(newProduct['price'] || typeof newProduct['price'] === 'number') ||
			!(newProduct['thumbnail'] || typeof newProduct['thumbnail'] === 'string')
		) {
			throw Error(
				'El producto ingresado debe contener los siguientes datos: title: string, price: number, thumbnail: string',
			);
		}

		try {
			const stats = await this.fileStat();
			if (stats.size > 2) {
				const oldData = await this.readFile();
				const newData = { id: oldData.length + 1, ...newProduct };
				oldData.push(newData);
				await this.writeFile(oldData);
				return;
			} else {
				const initialProductObj = { id: 1, ...newProduct };
				const initialArrOfData = [initialProductObj];
				await this.writeFile(initialArrOfData);
				return;
			}
		} catch (err: any) {
			if (err.code === 'ENOENT') {
				console.log(`No existe el archivo especificado o el nombre es incorrecto => ${this.fileName}`);
			} else {
				console.log(err);
			}
		}
	};
}

export const productController = new Container('products.txt');
