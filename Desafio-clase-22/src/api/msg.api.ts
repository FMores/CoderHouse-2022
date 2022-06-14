import { IMessage, PersistenceType } from '../DAO/interfaces';
import { MsgFactory } from '../DAO/msg.factory';

class MsgAPI {
	private msg: any;

	constructor() {
		this.msg = MsgFactory.get(PersistenceType.FileSystem);
	}

	public async get() {
		return await this.msg.get();
	}

	public async save(new_msg: IMessage) {
		await this.msg.save(new_msg);
	}
}

export const msg_api = new MsgAPI();
