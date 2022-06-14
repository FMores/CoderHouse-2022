import { IMessage } from 'src/DAO/interfaces';
import { msg_api } from '../api/msg.api';

class MsgController {
	public async get() {
		return await msg_api.get();
	}

	public async save(new_msg: IMessage): Promise<void> {
		await msg_api.save(new_msg);
	}
}

export const msgController = new MsgController();
