import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

class Container {
	constructor(
		private fileName: string,
		private filePath = path.resolve(__dirname, fileName),
		private fileNotFound: string = `Error: no se encuentra el archivo: ${fileName}`,
	) {}

	private getRandomIntInclusive = (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	fileStat = async () => {
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

	public getAll = async (req: Request, res: Response) => {
		try {
			await this.fileStat();
			const data = await this.readFile();
			if (data.length > 0) {
				res.status(200).send({ data: data });
			} else {
				res.status(404).send({ data: null });
			}
		} catch (err) {
			if (err.code === 'ENOENT') {
				res.status(404).send({ Error: this.fileNotFound });
			} else {
				res.status(404).send({ Error: err.message });
			}
		}
	};

	public getRandom = async (req: Request, res: Response) => {
		try {
			await this.fileStat();
			const data = await this.readFile();
			const indexRandom = this.getRandomIntInclusive(0, data.length - 1);
			if (data.length > 0) {
				res.status(200).send({ data: data[indexRandom] });
			} else {
				res.status(200).send({ data: null });
			}
		} catch (err) {
			if (err.code === 'ENOENT') {
				res.status(404).send({ Error: this.fileNotFound });
			} else {
				res.status(404).send({ Error: err.message });
			}
		}
	};
}

const operation = new Container('products.txt');

export default operation;
