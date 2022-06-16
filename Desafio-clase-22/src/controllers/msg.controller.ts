import { IMessage } from 'src/DAO/interfaces';
import { normalizr_function } from '../utils/normalizr';
import { msg_api } from '../api/msg.api';

class MsgController {
	public async get() {
		return await msg_api.get();
	}

	public async add(new_msg: IMessage): Promise<void> {
		await msg_api.add(new_msg);
	}
}

export const msgController = new MsgController();
