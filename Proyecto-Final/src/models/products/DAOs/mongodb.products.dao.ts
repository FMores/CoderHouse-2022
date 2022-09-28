import productsMongoModel from '../mongo.prod.model';
import { IProduct } from '../product.interfaces';
import { ProductDTO } from '../DTO/product.dto';
import { Types } from 'mongoose';

export class MongoDBProductDAO {
	private productsCollection: any;

	constructor(private readonly dataBase: 'mongoDB_local' | 'mongoDB_atlas') {
		this.productsCollection = productsMongoModel;
	}

	private checkId(id: string): void {
		const ObjectId = Types.ObjectId;

		if (id && !ObjectId.isValid(id)) {
			throw { status: 400, message: 'Invalid product id' };
		}
	}

	private async findProductById(id: string) {
		return await this.productsCollection.findById(id);
	}

	async get(id?: string): Promise<ProductDTO[] | undefined> {
		if (id) {
			this.checkId(id);

			if ((await this.findProductById(id)) === null) {
				return undefined;
			}

			return [new ProductDTO(await this.productsCollection.findById(id))];
		}

		const resultGetAllProducts = await this.productsCollection.find();

		const products: ProductDTO[] = [];

		resultGetAllProducts.forEach((el: IProduct) => {
			products.push(new ProductDTO(el));
		});

		return products;
	}

	async post(data: IProduct): Promise<ProductDTO[]> {
		const newProduct = new this.productsCollection(data);
		await newProduct.save();
		return [new ProductDTO(newProduct)];
	}

	async put(data: IProduct, id: string): Promise<ProductDTO[] | undefined> {
		this.checkId(id);

		if ((await this.findProductById(id)) === null) {
			return undefined;
		}

		const updatedProduct = await this.productsCollection.findByIdAndUpdate(id, data, { new: true });

		return [new ProductDTO(updatedProduct)];
	}

	async delete(id: string): Promise<boolean | string | undefined> {
		this.checkId(id);

		if ((await this.findProductById(id)) === null) {
			return undefined;
		}

		const productDeleted = await this.productsCollection.findByIdAndDelete(id, { new: true });

		return productDeleted._id;
	}
}
