import mongoose, { connect, connection } from 'mongoose';
import { logger } from '../utils/winston.logger';
import config from '../config';

export const connectMongoDB = async (
    dbType: 'mongoDB_local' | 'mongoDB_atlas'
): Promise<typeof mongoose | undefined> => {
    try {
        if (connection.readyState === 2) {
            return;
        }

        if (dbType === 'mongoDB_local') {
            await connect(config.MONGODB_LOCAL_URL);
            logger.info('Successful connection to local mongo database');
        } else {
            await connect(config.MONGODB_ATLAS_SRV);
            logger.info('Successful connection to mongo atlas database');
        }
    } catch (err: any) {
        logger.error(`Cannot connect to the database because: ${err.message}`);
    }
};
