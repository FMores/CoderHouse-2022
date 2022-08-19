import { MongoDBSingleton } from '../../services/Mongo.Service';
import mongodbProductModel from './prod.mongo.model';
import { date_creator } from '../../utils/date.creator';
import { IProduct } from './prod.interfaces';
import { CommonMethodsDAO } from '../generics.interfaces';

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
			return productById;
		}

		const allProducts = await this.prodModel.find();
		return allProducts;
	}

	async add(prod_data: IProduct): Promise<IProduct[]> {
		const timestamp = await date_creator();

		const newProduct = new this.prodModel({ ...prod_data, timestamp });

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
