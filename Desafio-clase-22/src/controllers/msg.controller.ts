import { IMessage } from '../DAO/interfaces';
import { msg_api } from '../api/msg.api';
import { normalizrFunc } from '../utils/normalizr';

class MsgController {
	public async get() {
		const messages = await msg_api.get();

		const messagesNormalized = normalizrFunc(messages);

		return messagesNormalized;
	}

	public async add(new_msg: IMessage): Promise<void> {
		await msg_api.add(new_msg);
	}
}

export const msgController = new MsgController();
