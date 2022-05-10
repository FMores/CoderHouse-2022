import { sqLite_service } from '../services/sqlite3';

interface IMessage {
	author: string;
	text: string;
}

class Container {
	constructor(private table_name: string) {}

	public getAll = async () => {
		try {
			const current_msg_list = await sqLite_service.get_all(this.table_name);
			if (current_msg_list.length > 0) {
				return current_msg_list;
			} else {
				return null;
			}
		} catch (err: any) {
			console.log('Algo salio mal:', err.message);
		}
	};

	public save = async (new_msg_data: IMessage) => {
		try {
			await sqLite_service.save(new_msg_data, this.table_name);
		} catch (err: any) {
			console.log('Algo salio mal:', err.message);
		}
	};
}

export const messagesController = new Container('messages');
