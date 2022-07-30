import { IProduct, PersistenceType } from '../interfaces';
import mongodbProductModel from '../../models/mongo.prod.model';
import { mongoConnection } from '../../services/Mongo.Service';
import { date_creator } from '../../utils/date.creator';

export class ProductMongoDAO {
	private product: any;

	constructor(public persistence: PersistenceType) {
		this.product = mongodbProductModel;
		this.initMongo();
	}

	private async initMongo() {
		await mongoConnection(this.persistence);
	}

	public async get() {
		return await this.product.find();
	}

	public async add(prod_data: IProduct) {
		const date = await date_creator();

		const prodToSave = {
			title: prod_data.title,
			price: prod_data.price,
			thumbnail: prod_data.thumbnail,
			timestamp: date,
		};

		const newProduct = new this.product(prodToSave);

		await newProduct.save();
	}
}
