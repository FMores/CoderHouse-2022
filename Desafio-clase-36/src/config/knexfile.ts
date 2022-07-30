import type { Knex } from 'knex';
import path from 'path';

// Update with your config settings.
// Para utilizar con Typescript, los comandos serian los siguientes:
// Crear Knexfile.ts => npx knex init -x ts
// Crear carpeta DB con migations y seeds => npx knex migrate:make <nombre a eleccion>
// En el host se puede utilizar el puerto por defecto o la palabra "localhost"

const DB_config: { [key: string]: Knex.Config } = {
	development: {
		client: 'mysql',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'ecommerce',
		},
		migrations: {
			directory: __dirname + '../db/migrations',
		},
		seeds: {
			directory: __dirname + '../db/seeds',
		},
		pool: { min: 0, max: 7 },
	},
};

export default DB_config;
