import { NextFunction, Request, Response } from 'express';
import { cart_persistence } from '../DAO/cart/cartDAO';

class Cart_controller {
	public getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const current_list_of_carts = await cart_persistence.getAll();
			res.status(200).send({ Cart_list: current_list_of_carts });
		} catch (err: any) {
			next(err);
		}
	};

	public create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const cart_id = await cart_persistence.create();
			res.status(200).send({ cart_id: cart_id });
		} catch (err: any) {
			next(err);
		}
	};

	public add_product = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { id_prod } = req.body;
		try {
			const cart = await cart_persistence.add_product(id, id_prod);
			res.status(200).send({ cart });
		} catch (err: any) {
			next(err);
		}
	};

	public cart_products = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		try {
			const cart_products = await cart_persistence.get_cart_products(id);
			res.status(200).send({ cart_id: id, products: cart_products });
		} catch (err: any) {
			next(err);
		}
	};

	public delete_cart = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			await cart_persistence.delete_cart(id);
			res.status(200).send({ Status: 'Successfully complete' });
		} catch (err: any) {
			next(err);
		}
	};

	public delete_product = async (req: Request, res: Response, next: NextFunction) => {
		const { id, id_prod } = req.params;
		try {
			await cart_persistence.delete_product(id, id_prod);
			res.status(200).send({ Status: 'Successfully complete' });
		} catch (err: any) {
			next(err);
		}
	};
}

export const cart_controller = new Cart_controller();
