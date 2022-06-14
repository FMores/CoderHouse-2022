import { normalize, schema } from 'normalizr';

class Normalizr {
	private msg = [
		{
			author: {
				id: '1@mail.com',
				nombre: 'nombre del usuario',
				apellido: 'apellido del usuario',
				edad: 'edad del usuario',
				alias: 'alias del usuario',
				avatar: 'url avatar (foto, logo) del usuario',
			},
			text: 'mensaje del usuario 1',
		},
		{
			author: {
				id: '2@mail.com',
				nombre: 'nombre del usuario',
				apellido: 'apellido del usuario',
				edad: 'edad del usuario',
				alias: 'alias del usuario',
				avatar: 'url avatar (foto, logo) del usuario',
			},
			text: 'mensaje del usuario 2',
		},
		{
			author: {
				id: '3@mail.com',
				nombre: 'nombre del usuario',
				apellido: 'apellido del usuario',
				edad: 'edad del usuario',
				alias: 'alias del usuario',
				avatar: 'url avatar (foto, logo) del usuario',
			},
			text: 'mensaje del usuario 3',
		},
	];

	schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
	text = new schema.Entity('text', { author: this.schemaAuthor }, { idAttribute: 'id' });

	msgSchemaEntity = new schema.Entity(
		'messages',
		{
			texto: [this.text],
		},
		{ idAttribute: '_id' },
	);

	public async nmzr(messages: Array<{}>) {
		let msgNormalized = normalize(this.msg, this.msgSchemaEntity);

		return msgNormalized;
	}
}

export const normalizr_function = new Normalizr();
