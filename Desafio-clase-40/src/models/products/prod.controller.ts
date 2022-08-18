import { IProduct } from './prod.interfaces';
import { product_api } from './prod.API';
import { number } from 'joi';

class Product_controller {
	public async get(id?: number) {
		return await product_api.get(id);
	}

	public async add(new_product_data: IProduct) {
		await product_api.add(new_product_data);
	}
}

export const product_Controller = new Product_controller();
