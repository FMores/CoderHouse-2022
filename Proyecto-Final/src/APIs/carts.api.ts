import { IProduct } from '../models/products/product.interfaces';
import { threadId } from 'worker_threads';
import config from '../config';
import { ICart } from '../models/carts/carts.interfaces';
import { CartsFactory } from '../models/carts/DAOs/cart.factory';
import { MongoDBCartsDAO } from '../models/carts/DAOs/mongodb.carts.dao';

class CartAPI {
	private catrsDAO: MongoDBCartsDAO;

	constructor() {
		this.catrsDAO = CartsFactory.get(config.MONGODB_MODE);
	}

	async get(user_id: string): Promise<ICart[]> {
		return await this.catrsDAO.get(user_id);
	}

	async post(user_id: string, prod_id: string, prod_qty?: number | undefined): Promise<ICart[]> {
		return await this.catrsDAO.post(user_id, prod_id, prod_qty);
	}

	async put(data: ICart, id: string): Promise<ICart[]> {
		throw new Error('Method not implemented.');
	}

	async delete(user_id: string, prod_id: string): Promise<string> {
		return this.catrsDAO.delete(user_id, prod_id);
	}

	async checkout(user_id: string, user_email: string): Promise<string> {
		return this.catrsDAO.checkout(user_id, user_email);
	}

	async getOrder(user_id: string): Promise<any> {
		return this.catrsDAO.getOrder(user_id);
	}
}

export const cartAPI = new CartAPI();
