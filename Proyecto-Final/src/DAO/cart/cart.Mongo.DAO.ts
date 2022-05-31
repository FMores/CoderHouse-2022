import { CartMethodsDAO, PersistenceType } from '../interfaces';
import { mongoConnection } from '../../services/mongoService';
import mongoose, { Types } from 'mongoose';
import mongodbCartModel from '../../models/mongodb.cart.model';
import mongodbProductModel from '../../models/mongodb.product.model';

// Harcoded userId = '628c290ebeed9a7b4df6b722';

export class CartMongoDAO implements CartMethodsDAO<any> {
	private cart: any;
	private product: any;

	constructor(persistence: PersistenceType) {
		mongoConnection(persistence);
		this.cart = mongodbCartModel;
		this.product = mongodbProductModel;
	}

	private async checkId(id: string): Promise<any> {
		//if (!mongoose.isValidObjectId(id)) return null;
		if (!mongoose.Types.ObjectId.isValid(id)) throw Error('asfasfasfa');
	}

	public async get(id?: string): Promise<any> {
		if (id) {
			await this.checkId(id);
			const cartByUserId = await this.cart.find({ userId: id }); //.populate('items.productId');
			return cartByUserId;
		}

		const listOfCart = await this.cart.find();
		return listOfCart;
	}

	public async add(id: string, id_prod: string): Promise<any> {
		await this.checkId(id);

		const productData = await this.product.find({ _id: id_prod });

		if (productData.length === 0) {
			return [];
		}

		const currentCart = await this.get(id);

		if (currentCart.length > 0) {
			const existProduct = currentCart[0].items.filter((el: any) => el.productId.toString() === id_prod);

			if (existProduct.length > 0) {
				const cartUpdated = await this.cart.findOneAndUpdate(
					{ userId: id, 'items.productId': id_prod },
					{
						$set: {
							'items.$.quantity': existProduct[0].quantity + 1,
							quantity: currentCart[0].quantity + 1,
							subTotal: currentCart[0].subTotal + productData[0].price,
						},
					},
					{ new: true },
				);

				cartUpdated.save();

				return cartUpdated;
			}

			const cartAddingProduct = await this.cart.findOneAndUpdate(
				{ userId: id },
				{
					$set: { quantity: currentCart[0].quantity + 1, subTotal: currentCart[0].subTotal + productData[0].price },
					$push: { items: { productId: id_prod, quantity: 1 } },
				},
				{ new: true },
			);

			cartAddingProduct.items.quantity = cartAddingProduct.items.quantity + 1;

			return cartAddingProduct;
		}

		const newCart = {
			status: true,
			userId: id,
			items: { productId: id_prod, quantity: 1 },
			quantity: 1,
			subTotal: productData[0].price,
		};

		const cart = new this.cart(newCart);

		await cart.save();

		return cart;
	}

	public async delete(id: string, id_prod: string): Promise<any> {
		const currentCart = await this.get(id);

		if (currentCart.length > 0) {
			const existProduct = currentCart[0].items.filter((el: any) => el.productId.toString() === id_prod);
			return [];
		}
	}
}
