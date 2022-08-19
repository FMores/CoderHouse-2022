import { PersistenceType, CommonMethodsDAO } from '../generics.interfaces';
import { ProductFactory } from './prod.factory';
import { ProdcuctRepository } from './prod.repository';
import { IProduct } from './prod.interfaces';
import { ProductDTO } from './prod.DTO';

class ProductsApi {
	private dao: CommonMethodsDAO<IProduct>;
	private dto: any;
	private prodRepository: ProdcuctRepository;

	constructor() {
		this.dao = ProductFactory.get(PersistenceType.Mongo_Atlas);
		this.prodRepository = new ProdcuctRepository(this.dao, ProductDTO);
	}

	async get(id?: number) {
		return this.prodRepository.get(id);
	}

	async add(item: IProduct) {
		return this.prodRepository.add(item);
	}
}

export const product_api = new ProductsApi();
