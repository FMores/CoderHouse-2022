import DB_config from '../config/knexfile';
import knex from 'knex';

interface IProduct {
	id?: number;
	title: string;
	price: number;
	thumbnail: string;
}

class MySQL_service {
	constructor(private enviroment = process.env.MySQL_ENV || 'development', private DB = knex(DB_config[enviroment])) {}

	public init = async (): Promise<void> => {
		try {
			const hasTable = await this.DB.schema.hasTable('products');

			if (!hasTable) {
				await this.DB.schema.createTable('products', (prod_table) => {
					prod_table.increments();
					prod_table.string('title').notNullable();
					prod_table.decimal('price', 9, 2).notNullable();
					prod_table.string('thumbnail').notNullable();
					prod_table.timestamp('createdAt').defaultTo(this.DB.fn.now());
				});
			}
		} catch (err: any) {
			console.log('Algo salio mal con MySQL:', err.message);
		}
	};

	public get_all = async (table_name: string): Promise<IProduct[]> => {
		const current_product_list = await this.DB(table_name);
		return current_product_list;
	};

	public save = async (new_product_data: IProduct, table_name: string) => {
		await this.DB(table_name).insert(new_product_data);
	};
}

export const mysql_service = new MySQL_service();
