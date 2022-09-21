import { IProduct } from '../models/products/product.interfaces';
import { MongoDBProductDAO } from '../models/products/DAOs/mongodb.products.dao';
import { ProductsFactory } from '../models/products/DAOs/products.factory';
import { ProductDTO } from '../models/products/product.dto';
import { BaseAPIs } from './base.api';

export class ProductAPI implements BaseAPIs<IProduct | ProductDTO> {
    private productDAO: MongoDBProductDAO;

    constructor() {
        this.productDAO = ProductsFactory.get('mongoDB_atlas');
    }

    async get(id?: string | undefined): Promise<ProductDTO[] | undefined> {
        return await this.productDAO.get(id);
    }

    async post(data: IProduct): Promise<ProductDTO[]> {
        return await this.productDAO.post(data);
    }

    async put(data: IProduct, id: string): Promise<ProductDTO[] | undefined> {
        return this.productDAO.put(data, id);
    }

    async delete(id: string): Promise<boolean | string | undefined> {
        return await this.productDAO.delete(id);
    }
}

export const productAPI = new ProductAPI();
