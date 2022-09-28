import { IMessage } from '../models/messages/messages.interface';
import { msg_api } from '../APIs/messages.api';

class MsgController {
	public async get() {
		return await msg_api.get();
	}

	public async add(new_msg: IMessage): Promise<void> {
		await msg_api.add(new_msg);
	}
}

export const messageController = new MsgController();
