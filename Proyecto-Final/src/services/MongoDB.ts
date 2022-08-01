import mongoose from 'mongoose';
import { PersistenceType } from '../config/interfaces';
import config from '../config';
import { logger } from '../utils/winston.logger';

export const mongoConnection = async (type: PersistenceType) => {
	try {
		if (type === 'Mongo') {
			const mongoDbLocal = await mongoose.connect(config.MONGO_LOCAL_URI);
			logger.info('Successful connection to local mongo database');
			return mongoDbLocal;
		} else {
			const mongoAtlas = await mongoose.connect(config.MONGO_ATLAS_URI);
			logger.info('Successful connection to mongo atlas database');

			return mongoAtlas;
		}
	} catch (err: any) {
		logger.error(`Cannot connect to the database because: ${err.message}`);
	}
};
