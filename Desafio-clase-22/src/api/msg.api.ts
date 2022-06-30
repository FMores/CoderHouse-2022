import { IMessage, PersistenceType } from '../DAO/interfaces';
import { MsgFactory } from '../DAO/msg.factory';

// Argumentos valirdos para MsgFactory.get()
// PersistenceType.FireBase
// PersistenceType.Mongo
// PersistenceType.Mongo_Atlas
// Si no se ingresa ninguno de los anteriores, toma por defecto => PersistenceType.FileSystem

class MsgAPI {
	private msg: any;

	constructor() {
		this.msg = MsgFactory.get(PersistenceType.FileSystem);
	}

	public async get() {
		return await this.msg.get();
	}

	public async add(new_msg: IMessage) {
		await this.msg.add(new_msg);
	}
}

export const msg_api = new MsgAPI();
