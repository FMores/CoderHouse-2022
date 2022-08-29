import { IProduct } from './prod.interfaces';
import { product_api } from './prod.API';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import prodMongoModel from './prod.mongo.model';

class Product_controller {
	public async get(id?: number) {
		return await product_api.get(id);
	}

	public async add(new_product_data: IProduct) {
		await product_api.add(new_product_data);
	}
}

export const product_Controller = new Product_controller();

const productTC = composeWithMongoose(prodMongoModel);

export const productTcQuery = {
	productFindById: productTC.getResolver('findById'),
	productFindMany: productTC.getResolver('findMany'),
};

export const productTcMutation = {
	productCreateOne: productTC.getResolver('createOne'),
	productUpdateById: productTC.getResolver('updateById'),
	productDeleteById: productTC.getResolver('removeById'),
};
