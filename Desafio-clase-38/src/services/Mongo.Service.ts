import { PersistenceType } from '../DAO/interfaces';
import config from '../config/index';
import mongoose, { connection, connect } from 'mongoose';
import { logger } from '../utils/winston.logger';

export const mongoConnection = async (type: PersistenceType): Promise<typeof mongoose | undefined> => {
	try {
		if (connection.readyState === 2) {
			return;
		}

		if (type === 'Mongo') {
			const mongoDbLocal = await connect(config.MONGO_LOCAL_URI);
			logger.info('Successful connection to local mongo database');
			return mongoDbLocal;
		} else {
			const mongoAtlas = await connect(config.MONGO_ATLAS_URI);
			logger.info('Successful connection to mongo atlas database');

			return mongoAtlas;
		}
	} catch (err: any) {
		logger.error(`Cannot connect to the database because: ${err.message}`);
	}
};
