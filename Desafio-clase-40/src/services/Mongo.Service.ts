import config from '../config/index';
import mongoose, { connect } from 'mongoose';
import { logger } from '../utils/winston.logger';

export class MongoDBSingleton {
	private static instance: MongoDBSingleton;

	private constructor() {
		this.initMongoDB();
	}

	/**
	 * El singleton no devuelte ninguna instancia de mongo ya que
	 * doy inicio a la conexion directamente y utilizo la instancia
	 * de los modelos por separado. Pero si controla que el inicio
	 * de mongo se realice una sola vez.
	 */

	public static getInstance(): MongoDBSingleton {
		if (!MongoDBSingleton.instance) {
			MongoDBSingleton.instance = new MongoDBSingleton();
		}
		return MongoDBSingleton.instance;
	}

	public async initMongoDB(): Promise<typeof mongoose | undefined> {
		try {
			if (config.MONGODB_MODE === 'LOCAL') {
				await connect(config.MONGO_LOCAL_URI);

				logger.info('Successful connection to local mongo database');

				return;
			} else {
				await connect(config.MONGO_ATLAS_URI);

				logger.info('Successful connection to mongo atlas database');

				return;
			}
		} catch (err: any) {
			logger.error(`Cannot connect to the database because: ${err.message}`);
		}
	}
}
