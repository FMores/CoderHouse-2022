import { NextFunction, Request, Response } from 'express';
import { cartAPI } from '../API/cartAPI';

class CartController {
	// Harcoded userId = '628c290ebeed9a7b4df6b722';

	public getAll = async (req: Request, res: Response, next: NextFunction) => {
		const result = await cartAPI.get();

		res.status(200).send({ carts: result });
	};

	public get = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const result = await cartAPI.get(id);

		if (result.length === 0) {
			res.status(404).send({ status: 'Not Found' });
			return;
		}

		res.status(200).send({ cart: result });
		return;
	};

	public add = async (req: Request, res: Response, next: NextFunction) => {
		const { id, id_prod } = req.params;

		const result = await cartAPI.add(id, id_prod);

		if (result.length === 0) {
			res.status(404).send({ status: 'Not Found' });
			return;
		}

		res.status(200).send({ newProduct: result });
		return;
	};

	public delete = async (req: Request, res: Response, next: NextFunction) => {
		const { id, id_prod } = req.params;

		const result = await cartAPI.delete(id, id_prod);

		if (result && result.length === 0) {
			res.status(404).send({ status: 'Not Found' });
			return;
		}

		res.status(200).send({ Status: 'Delete product by productId and userId' });
	};
}

export const cartController = new CartController();
