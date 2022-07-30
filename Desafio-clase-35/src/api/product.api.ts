import { ProductFactory } from '../DAO/products/product.factory';
import { IProduct, PersistenceType } from '../DAO/interfaces';
import { logger } from '../utils/winston.logger';

class ProductsApi {
	private product: any;

	constructor() {
		this.product = ProductFactory.get(PersistenceType.Mongo_Atlas);
	}

	public async get() {
		try {
			return await this.product.get();
		} catch (err: any) {
			logger.error(`ProductApi => get func. error: ${err.message}`);
		}
	}

	public async add(new_product_data: IProduct) {
		try {
			await this.product.add(new_product_data);
		} catch (err: any) {
			logger.error(`ProductApi => add func. error: ${err.message}`);
		}
	}
}

export const product_api = new ProductsApi();
