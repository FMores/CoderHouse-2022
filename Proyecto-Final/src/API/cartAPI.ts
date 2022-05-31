import { CartFactoryDAO } from '../DAO/cart/cart.Factory';
import { CartMethodsDAO, PersistenceType } from '../DAO/interfaces';

class CartAPI {
	private cart: CartMethodsDAO<any>;

	constructor() {
		this.cart = CartFactoryDAO.get(PersistenceType.Mongo);
	}

	public async get(id?: string): Promise<any> {
		return await this.cart!.get(id);
	}

	public async add(id: string, id_prod: string): Promise<any> {
		return await this.cart!.add(id, id_prod);
	}

	public async delete(id: string, id_prod: string): Promise<any> {
		return await this.cart!.delete(id, id_prod);
	}
}

export const cartAPI = new CartAPI();
