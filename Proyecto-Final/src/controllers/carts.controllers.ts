import { Request, Response } from 'express';
import { cartAPI } from '../APIs/carts.api';

class CartController {
	async get(req: Request, res: Response): Promise<void> {
		const user_id = req.user!._id.toString();
		const resultGetToCart = await cartAPI.get(user_id);

		if (resultGetToCart.length === 0) {
			res.status(404).send({ status: 404, cart: null });
			return;
		}

		res.status(200).send({ status: 'Successfull', cart: resultGetToCart });
	}

	async post(req: Request, res: Response): Promise<void> {
		const { prod_id, prod_qty } = req.body;

		if (!prod_id) {
			throw { status: 400, message: 'Product id is required' };
		}

		const resultPostToCart = await cartAPI.post(
			req.user!._id.toString(),
			prod_id,
			Number(prod_qty),
		);

		res.status(200).send({ status: 'Successfull', cart: resultPostToCart });
	}

	async put(req: Request, res: Response): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async delete(req: Request, res: Response): Promise<void> {
		const { prod_id } = req.params;
		const user_id = req.user!._id.toString();

		const resultDeleteProduct = await cartAPI.delete(user_id, prod_id);
		res.status(200).send({ status: 'Successfull', id_prod_deleted: resultDeleteProduct });
	}

	async checkout(req: Request, res: Response): Promise<void> {
		const user_id = req.user!._id.toString();
		const user_email = req.user!.email.toString();
		const resultCheckoutCart = await cartAPI.checkout(user_id, user_email);
		res.status(200).send({ status: 'Successfull', order_checkout: resultCheckoutCart });
	}

	async getOrder(req: Request, res: Response): Promise<any> {
		const user_id = req.user!._id.toString();

		const orderByUserId = await cartAPI.getOrder(user_id);

		res.status(200).send({ status: 'Successfull', orderByUserId });
	}
}

export const cartController = new CartController();
