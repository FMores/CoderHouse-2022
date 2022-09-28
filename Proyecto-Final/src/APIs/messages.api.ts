import { MessagesFactory } from '../models/messages/DAOs/messages.factory';
import { IMessage } from '../models/messages/messages.interface';
import { logger } from '../utils/winston.logger';
import config from '../config';

class MsgAPI {
	private msg: any;

	constructor() {
		this.msg = MessagesFactory.get(config.MONGODB_MODE);
	}

	public async get() {
		try {
			return await this.msg.get();
		} catch (err: any) {
			logger.error(`MsgApi => get func. error: ${err.message}`);
		}
	}

	public async add(new_msg: IMessage) {
		try {
			await this.msg.add(new_msg);
		} catch (err: any) {
			logger.error(`MsgApi => add func. error: ${err}`);
		}
	}
}

export const msg_api = new MsgAPI();
