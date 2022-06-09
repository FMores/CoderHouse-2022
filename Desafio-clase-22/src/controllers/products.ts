import { NextFunction, Request, Response } from 'express';
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

	public getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this.fileStat();
			const data = await this.readFile();
			if (data.length > 0) {
				res.status(200).send({ data: data });
			} else {
				res.status(404).send({ data: null });
			}
		} catch (err: any) {
			req.statusCode = 404;
			next(err);
		}
	};

	public getById = async (req: Request, res: Response, next: NextFunction) => {
		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			res.status(400).send({ Error: 'El id buscado debe ser tipo numerico' });
		}

		try {
			await this.fileStat();
			const data = await this.readFile();
			const productById = data.filter((e: IProduct) => e.id === id);
			if (productById.length > 0) {
				res.status(200).send({ product: productById });
			} else {
				res.status(404).send({ product: null });
			}
		} catch (err: any) {
			req.statusCode = 404;
			next(err);
		}
	};

	public save = async (req: Request, res: Response, next: NextFunction) => {
		const { title, price, thumbnail } = req.body;

		const newProduct = { title, price, thumbnail };

		if (
			!(newProduct['title'] || typeof newProduct['title'] === 'string') ||
			!(newProduct['price'] || typeof newProduct['price'] === 'number') ||
			!(newProduct['thumbnail'] || typeof newProduct['thumbnail'] === 'string')
		) {
			res.status(400).send({
				Error:
					'El producto ingresado debe contener los siguientes datos: title: string, price: number, thumbnail: string',
			});
			return;
		}

		try {
			const stats = await this.fileStat();
			if (stats.size > 2) {
				const oldData = await this.readFile();
				const newData = { id: oldData.length + 1, ...newProduct };
				oldData.push(newData);
				await this.writeFile(oldData);
				res.status(200).send({ saved_data: newData });
			} else {
				const initialProductObj = { id: 1, ...newProduct };
				const initialArrOfData = [initialProductObj];
				await this.writeFile(initialArrOfData);
				res.status(200).send({ saved_data: initialProductObj });
			}
		} catch (err: any) {
			req.statusCode = 404;
			next(err);
		}
	};

	public updateById = async (req: Request, res: Response, next: NextFunction) => {
		const { title, price, thumbnail } = req.body;
		const id = parseInt(req.params.id);

		const newData: any = { title, price, thumbnail };

		if (isNaN(id)) {
			res.status(400).send({ Error: 'El id buscado debe ser tipo numerico' });
			return;
		}

		try {
			await this.fileStat();
			const oldData = await this.readFile();
			const objIndex = oldData.findIndex((el: IProduct) => el.id === id);
			if (objIndex !== -1) {
				let objToUpdate = oldData[objIndex];
				for (let val in newData) {
					if (newData[val]) {
						objToUpdate[val] = newData[val];
					}
				}
				oldData.splice(objIndex, 1, objToUpdate);
				this.writeFile(oldData);
				res.send({ msg: objToUpdate });
			} else {
				res.status(404).send({ Error: { status: 'No existe el id' } });
			}
		} catch (err: any) {
			next(err);
		}
	};

	public deleteById = async (req: Request, res: Response, next: NextFunction) => {
		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			res.status(400).send({ Error: 'El id buscado debe ser tipo numerico' });
		}

		try {
			await this.fileStat();
			const data = await this.readFile();
			if (data.length === 0) {
				res.status(404).send({ product: null });
			}

			const checkId = data.find((e: IProduct) => e.id === id);

			if (checkId) {
				const newData = data.filter((e: IProduct) => e.id !== id);
				await fs.writeFile(this.filePath, JSON.stringify(newData, null, '\t'));
				res.status(200).send({ status: 'successfull' });
			} else {
				res.status(404).send({ product: null });
			}
		} catch (err: any) {
			req.statusCode = 404;
			next(err);
		}
	};
}

export const productController = new Container('products.txt');
