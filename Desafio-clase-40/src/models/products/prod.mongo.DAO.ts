import { MongoDBSingleton } from '../../services/Mongo.Service';
import mongodbProductModel from './prod.mongo.model';
import { date_creator } from '../../utils/date.creator';
import { IProduct } from './prod.interfaces';
import { CommonMethodsDAO } from '../generics.interfaces';
import { ProductDTO } from './prod.DTO';

export class ProductMongoDAO implements CommonMethodsDAO<IProduct> {
	private prodModel: any;

	constructor() {
		this.prodModel = mongodbProductModel;
		this.initMongo();
	}

	private async initMongo(): Promise<void> {
		MongoDBSingleton.getInstance();
	}

	async get(id?: number) {
		if (id) {
			const productById = await this.prodModel(id);

			const producDTO = new ProductDTO(productById);

			return producDTO;
		}

		const allProducts = await this.prodModel.find();

		const allProductsDTO = allProducts.map((prod: IProduct) => new ProductDTO(prod));

		return allProductsDTO;
	}

	async add(prod_data: IProduct): Promise<IProduct[]> {
		const timestamp = await date_creator();

		const prodToSave_DTO = new ProductDTO({ ...prod_data, timestamp });

		const newProduct = new this.prodModel(prodToSave_DTO);

		await newProduct.save();

		return newProduct;
	}

	update(id: number, newProductData: IProduct): Promise<IProduct[]> {
		throw new Error('Method not implemented.');
	}
	delete(id: number): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
