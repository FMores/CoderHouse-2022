import { logger } from '../utils/winston.logger';
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
		this.msg = MsgFactory.get(PersistenceType.Mongo);
	}

	public async get() {
		try {
			return await this.msg.get();
		} catch (err: any) {
			logger.error(`MsgApi => get func. error=${err.message}`);
		}
	}

	public async add(new_msg: IMessage) {
		try {
			await this.msg.add(new_msg);
		} catch (err: any) {
			logger.error(`MsgApi => add func. error=${err.message}`);
		}
	}
}

export const msg_api = new MsgAPI();
