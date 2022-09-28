import { logger } from '../../../utils/winston.logger';
import { MongoDBProductDAO } from './mongodb.products.dao';

export class ProductsFactory {
    static get(dbType: 'mongoDB_local' | 'mongoDB_atlas') {
        switch (dbType) {
            case 'mongoDB_local':
                logger.info('Starting persistence in Mongo_Local for products');
                return new MongoDBProductDAO(dbType);
            default:
                logger.info('Starting persistence in Mongo_Atlas for products');
                return new MongoDBProductDAO(dbType);
        }
    }
}
