import fs from 'fs/promises';
import moment from 'moment';
import path from 'path';

interface IMessage {
	author: string;
	text: string;
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

	private writeFile = async (data: IMessage[]) => {
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

	public save = async (newMessage: IMessage) => {
		const date = moment().format('DD-MM-YY hh:mm:ss a');
		try {
			const stats = await this.fileStat();
			if (stats.size > 2) {
				const oldMsg = await this.readFile();
				const newData = { id: oldMsg.length + 1, timestamp: date, ...newMessage };
				oldMsg.push(newData);
				await this.writeFile(oldMsg);
				return;
			} else {
				const newMsg = { id: 1, timestamp: date, ...newMessage };
				const initArrOfMsg = [newMsg];
				await this.writeFile(initArrOfMsg);
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

export const messagesController = new Container('messages.txt');
