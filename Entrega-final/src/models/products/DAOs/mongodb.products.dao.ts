import { connectMongoDB } from '../../../services/mongodb.service';
import productsMongoModel from '../products.mongo.model';
import { BaseClassDAO } from './baseClass.dao';
import { IProduct } from 'src/models/products/product.interfaces';
import { Types } from 'mongoose';
import { ProductDTO } from '../product.dto';

const ObjectId = Types.ObjectId;

export class MongoDBProductDAO implements BaseClassDAO<ProductDTO | IProduct> {
    private db: any;

    constructor(private readonly dataBase: 'mongoDB_local' | 'mongoDB_atlas') {
        this.db = productsMongoModel;
        this.initMongoConnection(dataBase);
    }

    private async initMongoConnection(dataBase: 'mongoDB_local' | 'mongoDB_atlas') {
        await connectMongoDB(dataBase);
    }

    private checkId(id: string): void {
        if (id && !ObjectId.isValid(id)) {
            throw { status: 400, message: 'Invalid product id' };
        }
    }

    private async findProductById(id: string) {
        return await this.db.findById(id);
    }

    async get(id?: string): Promise<ProductDTO[] | undefined> {
        if (id) {
            this.checkId(id);

            if ((await this.findProductById(id)) === null) {
                return undefined;
            }

            return [new ProductDTO(await this.db.findById(id))];
        }

        const resultGetAllProducts = await this.db.find();

        const products: ProductDTO[] = [];

        resultGetAllProducts.forEach((el: IProduct) => {
            products.push(new ProductDTO(el));
        });

        return products;
    }

    async post(data: IProduct): Promise<ProductDTO[]> {
        const newProduct = new this.db(data);
        await newProduct.save();
        return [new ProductDTO(newProduct)];
    }

    async put(data: IProduct, id: string): Promise<ProductDTO[] | undefined> {
        this.checkId(id);

        if ((await this.findProductById(id)) === null) {
            return undefined;
        }

        const updatedProduct = await this.db.findByIdAndUpdate(id, data, { new: true });

        return [new ProductDTO(updatedProduct)];
    }

    async delete(id: string): Promise<boolean | string | undefined> {
        this.checkId(id);

        if ((await this.findProductById(id)) === null) {
            return undefined;
        }

        const productDeleted = await this.db.findByIdAndDelete(id, { new: true });

        return productDeleted._id;
    }
}
