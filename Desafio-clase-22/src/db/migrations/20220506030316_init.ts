import { Knex } from 'knex';

// Configuracion para inicializar las tablas en la DB
// Para cargar las tablas a la DB => npx knex migrate:latest

export const up = async (knex: Knex): Promise<void> => {
	try {
		await knex.schema.createTable('products', (prod_table) => {
			prod_table.increments();
			prod_table.string('title').notNullable();
			prod_table.decimal('price', 4, 2);
			prod_table.string('thumbnail').notNullable();
			prod_table.timestamp('createdAt').defaultTo(knex.fn.now());
		});
	} catch (err: any) {
		throw Error(err.message);
	}
};

// Configuracion para borrar las tablas en la DB
// Para eliminar las tablas => npx knex migrate:rollback

export const down = async (knex: Knex): Promise<void> => {
	try {
		await knex.schema.dropTable('products');
	} catch (err: any) {
		throw Error(err);
	}
};
