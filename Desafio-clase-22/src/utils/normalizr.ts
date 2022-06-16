import { normalize, schema } from 'normalizr';
import util from 'util';

class Normalizr {
	private data = {
		id: 154,
		chats: [
			{
				id: 1,
				author: {
					id: '1@mail.com',
					nombre: 'nombre del usuario',
					apellido: 'apellido del usuario',
					edad: 'edad del usuario',
					alias: 'alias del usuario',
					avatar: 'url avatar (foto, logo) del usuario',
				},
				comment: 'mensaje del usuario 1',
			},
			{
				id: 1,
				author: {
					id: '1@mail.com',
					nombre: 'nombre del usuario',
					apellido: 'apellido del usuario',
					edad: 'edad del usuario',
					alias: 'alias del usuario',
					avatar: 'url avatar (foto, logo) del usuario',
				},
				comment: 'mensaje 2',
			},
			{
				id: 2,
				author: {
					id: '2@mail.com',
					nombre: 'nombre del usuario',
					apellido: 'apellido del usuario',
					edad: 'edad del usuario',
					alias: 'alias del usuario',
					avatar: 'url avatar (foto, logo) del usuario',
				},
				comment: 'mensaje del usuario 2',
			},
			{
				id: 3,
				author: {
					id: '3@mail.com',
					nombre: 'nombre del usuario',
					apellido: 'apellido del usuario',
					edad: 'edad del usuario',
					alias: 'alias del usuario',
					avatar: 'url avatar (foto, logo) del usuario',
				},
				comment: 'mensaje del usuario 3',
			},
		],
	};

	private schemaUser = new schema.Entity('user', {}, { idAttribute: 'id' });

	private schemaAuthor = new schema.Entity('comment', {
		commenst: this.schemaUser,
	});

	msgSchema = new schema.Entity('messages', {
		author: [this.schemaUser],
		comments: [this.schemaAuthor],
	});

	public async nmzr(messages: Array<{}>) {
		let msgNormalized = normalize(this.data, this.msgSchema);
		console.log(util.inspect(msgNormalized, true, 7, true));
		return msgNormalized;
	}
}

export const normalizr_function = new Normalizr();
