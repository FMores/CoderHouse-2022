import knex from 'knex';
import DB_config from '../../knexfile';

interface IMessage {
	author: string;
	text: string;
}

class Sqlite_DB {
	constructor(
		private enviroment = process.env.SQlite_ENV || 'localStorage',
		private DB = knex(DB_config[enviroment]),
	) {
		console.log(`DB sqlite3 setting as ${this.enviroment}`);
	}

	public init = async () => {
		try {
			const hasTable = await this.DB.schema.hasTable('messages');

			if (!hasTable) {
				await this.DB.schema.createTable('messages', (msg_table) => {
					msg_table.increments();
					msg_table.string('email').notNullable();
					msg_table.string('text').notNullable();
					msg_table.timestamp('date', { useTz: true }).defaultTo(this.DB.fn.now());
				});
			}
		} catch (err: any) {
			console.log('Algo salio mal:', err.message);
		}
	};

	public get_all = async (table_name: string): Promise<IMessage[]> => {
		const current_msg_list = await this.DB(table_name);
		return current_msg_list;
	};

	public save = async (new_msg_data: IMessage, table_name: string) => {
		await this.DB(table_name).insert(new_msg_data);
	};
}

export const sqLite_service = new Sqlite_DB();
