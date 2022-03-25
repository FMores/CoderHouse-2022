import path from 'path';
import fs from 'fs/promises';

const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));

class Container {
	constructor(fileName) {
		this.fileName = fileName;
		this.filePath = path.resolve(__dirname, this.fileName);
		this.fileNotFound = `Error: no se encuentra el archivo: ${this.fileName}`;
	}

	errMsg(err) {
		if (err.code === 'ENOENT') {
			console.log(this.fileNotFound);
		} else {
			console.log(err.message);
		}
	}

	async fileStat() {
		const fileStats = await fs.stat(this.filePath);

		if (fileStats.size === 0) {
			await fs.writeFile(this.filePath, JSON.stringify([]));
			const fileInitialized = await fs.stat(this.filePath);
			return fileInitialized;
		}
		return fileStats;
	}

	async readFile() {
		await this.fileStat();
		const dataStr = await fs.readFile(this.filePath, 'utf8');
		const dataObj = JSON.parse(dataStr);
		return dataObj;
	}

	async writeFile(data) {
		await fs.writeFile(this.filePath, JSON.stringify(data, null, '\t'));
	}

	async save(newProduct) {
		if (!newProduct) {
			console.log({ error: 'se debe ingresar un producto para guardar' });
			return;
		}

		if (
			!newProduct.hasOwnProperty('title') ||
			!newProduct.hasOwnProperty('price') ||
			!newProduct.hasOwnProperty('thumbnail')
		) {
			console.log({
				error: 'El producto ingresado debe contener los siguientes datos: title, price, thumbnail',
			});
			return;
		}

		try {
			const stats = await this.fileStat();
			if (stats.size > 2) {
				const dataArr = await this.readFile();
				dataArr.push({ id: dataArr.length + 1, ...newProduct });
				await this.writeFile(dataArr);
				return;
			} else {
				await this.writeFile([{ id: 1, ...newProduct }]);
				return;
			}
		} catch (err) {
			this.errMsg(err);
		}
	}

	async getById(id) {
		if (!id) {
			console.log({ msg: 'Debe ingresar un id' });
			return;
		}

		if (typeof id !== 'number') {
			console.log({ msg: 'El id debe ser numerico' });
			return;
		}

		try {
			await this.fileStat();
			const data = await this.readFile();
			const productById = data.filter((e) => e.id === id);
			if (productById.length > 0) {
				console.log({ data: productById });
			} else {
				console.log({ data: null });
				return;
			}
		} catch (err) {
			this.errMsg(err);
		}
	}

	async getAll() {
		try {
			await this.fileStat();
			const data = await this.readFile();
			if (data.length > 0) {
				console.log({ data: data });
			} else {
				console.log({ data: null });
			}
		} catch (err) {
			this.errMsg(err);
		}
	}

	async deleteById(id) {
		if (!id) {
			console.log({ msg: 'Debe ingresar un id' });
			return;
		}

		if (typeof id !== 'number') {
			console.log({ msg: 'El id debe ser numerico' });
			return;
		}

		try {
			await this.fileStat();
			const data = await this.readFile();
			if (data.length === 0) {
				console.log({ data: null });
				return;
			}

			const checkId = data.find((e) => e.id === id);

			if (checkId) {
				const newData = data.filter((e) => e.id !== id);
				await fs.writeFile(this.filePath, JSON.stringify(newData, null, '\t'));
			} else {
				console.log({ data: null });
			}
		} catch (err) {
			this.errMsg(err);
		}
	}

	async deleteAll() {
		try {
			await this.fileStat();
			await this.writeFile([]);
			console.log({ process: 'complete' });
		} catch (err) {
			this.errMsg(err);
		}
	}
}

const operation = new Container('products.txt');

//operation.save({ title: 'mayonesa', price: 34, thumbnail: 'foto-mayonesa' });
//operation.getById(2);
//operation.getAll();
//operation.deleteById(2);
//operation.deleteAll();
