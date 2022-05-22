import { FileSystemDAO } from 'src/DAO/products/fileSystemDAO';
import { CommonMethodsDAO, NewProductI, PercistenceType, ProductI } from '../DAO/interfaces';
import { ProductFactoryDAO } from '../DAO/products/productFactory';

class ProductAPI {
	private product: CommonMethodsDAO | undefined;

	constructor() {
		this.product = ProductFactoryDAO.get(PercistenceType.Memory);
	}

	public async get(id: string): Promise<ProductI[] | undefined> {
		return await this.product!.get(id);
	}

	public async add(data: NewProductI): Promise<ProductI> {
		return await this.product!.add(data);
	}

	public async update(id: string, newProductData: NewProductI): Promise<ProductI> {
		return await this.product!.update(id, newProductData);
	}

	public async delete(id: string): Promise<void> {
		return await this.product!.delete(id);
	}
}

export const productAPI = new ProductAPI();
