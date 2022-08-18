import { messages_api } from './msg.API';
import { IMessage } from './msg.interfaces';

class MsgController {
	public async get() {
		return await messages_api.get();
	}

	public async add(new_msg: IMessage): Promise<void> {
		await messages_api.add(new_msg);
	}
}

export const msgController = new MsgController();
