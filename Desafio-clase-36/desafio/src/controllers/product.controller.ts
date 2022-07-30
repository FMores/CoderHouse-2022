import { logger } from '../utils/winston.logger';
import { product_api } from '../api/product.api';
import { IProduct } from '../DAO/interfaces';

class Product_controller {
	public async get() {
		return await product_api.get();
	}

	public async add(new_product_data: IProduct) {
		await product_api.add(new_product_data);
	}
}

export const product_Controller = new Product_controller();
