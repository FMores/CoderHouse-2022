import dotenv from 'dotenv';

dotenv.config();

export default {
	SERVER_PORT: process.env.SERVER_PORT || 3000,
	MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI || 'your_local_uri',
	MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI || 'your_mongo_atlas_uri',
	MYSQL_ENV: process.env.MYSQL_ENV || 'your_knex_config_enviroment',
	SQLITE3_ENV: process.env.SQLITE3_ENV || 'your_knex_config_enviroment',
};
