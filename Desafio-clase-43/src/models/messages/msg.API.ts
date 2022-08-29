import { logger } from '../../utils/winston.logger';
import { CommonMethodsDAO, PersistenceType } from '../generics.interfaces';
import { MessagesFactory } from './msg.factory';
import { IMessage } from './msg.interfaces';
import { MessagesRepository } from './msg.repository';
import { MessagesDTO } from './msg_DTO';

class MessagesAPI {
	private dao: CommonMethodsDAO<IMessage>;
	private MessagesRepository: MessagesRepository;

	constructor() {
		this.dao = MessagesFactory.get(PersistenceType.Mongo_Atlas);
		this.MessagesRepository = new MessagesRepository(this.dao, MessagesDTO);
	}

	public async get() {
		try {
			return await this.MessagesRepository.get();
		} catch (err: any) {
			logger.error(`MsgApi => get func. error=${err.message}`);
		}
	}

	public async add(new_msg: IMessage) {
		try {
			await this.MessagesRepository.add(new_msg);
		} catch (err: any) {
			logger.error(`MsgApi => add func. error=${err.message}`);
		}
	}
}

export const messages_api = new MessagesAPI();
