import { PersistenceType } from '../DAO/interfaces';
import config from '../config/indexConfig';
import DB_config from '../config/knexfile';
import knex from 'knex';

export const sqlConnection = async (type: PersistenceType) => {
	try {
		if (type === 'MySQL' && (await knex(DB_config[config.MYSQL_ENV]).raw('SELECT VERSION()'))) {
			console.log('Successful connection to MySQL database');

			return knex(DB_config[config.MYSQL_ENV]);
		} else if (type === 'SQLite3' && (await knex(DB_config[config.SQLITE3_ENV]).raw('SELECT sqlite_version()'))) {
			console.log('Successful connection to SQLite3 database');

			return knex(DB_config[config.SQLITE3_ENV]);
		} else {
			throw Error('type must be "MySQL" or "SQLite3"');
		}
	} catch (err: any) {
		throw new Error(`Cannot connect to the database because: ${err.message}`);
	}
};
