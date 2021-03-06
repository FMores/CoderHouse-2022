import { ProductFactoryDAO } from '../DAO/products/product.Factory';
import { CommonMethodsDAO, NewProductI, PersistenceType, ProductI } from '../DAO/interfaces';

class ProductAPI {
	private product: CommonMethodsDAO | undefined;

	constructor() {
		this.product = ProductFactoryDAO.get(PersistenceType.MySQL);
	}

	public async get(id: string): Promise<ProductI[]> {
		return await this.product!.get(id);
	}

	public async add(data: NewProductI): Promise<ProductI> {
		return await this.product!.add(data);
	}

	public async update(id: string, newProductData: NewProductI): Promise<ProductI | null> {
		return await this.product!.update(id, newProductData);
	}

	public async delete(id: string): Promise<null | undefined> {
		return await this.product!.delete(id);
	}
}

export const productAPI = new ProductAPI();
