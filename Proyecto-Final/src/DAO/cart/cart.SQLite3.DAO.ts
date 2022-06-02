import { CartMethodsDAO, PersistenceType } from '../interfaces';
import { sqlConnection } from '../../services/SQL.Service';

export class Sqlite3CartDAO implements CartMethodsDAO<any> {
	private db: any;
	persistence: PersistenceType;
	private tableName: string;

	constructor(persistence: PersistenceType) {
		this.persistence = persistence;
		this.connection();
		this.tableName = 'products';
	}

	private async connection(): Promise<void> {
		try {
			this.db = await sqlConnection(this.persistence);

			const existTable = await this.db.schema.hasTable('products');
			if (!existTable) {
				await this.db.schema.createTable('products', (prodTable: any) => {
					prodTable.increments('_id');
					prodTable.string('name').notNullable();
					prodTable.string('description').notNullable();
					prodTable.decimal('price', 12, 3).notNullable();
					prodTable.integer('stock').notNullable();
					prodTable.string('thumbnail').notNullable();
					prodTable.timestamp('timestamp').defaultTo(this.db.fn.now());
				});
			}
		} catch (err: any) {
			throw Error(err.message);
		}
	}

	public async get(id?: string): Promise<any> {
		return [];
	}

	public async add(id: string, id_prod: string): Promise<any> {
		return [];
	}

	public async delete(id: string, id_prod: string): Promise<any> {
		return [];
	}
}
