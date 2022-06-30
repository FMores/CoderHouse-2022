import { normalize, schema } from 'normalizr';

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' });

const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: '_id' });

export const normalizrFunc = (data: any) => normalize({ _id: 'messages', data }, schemaMensajes);
