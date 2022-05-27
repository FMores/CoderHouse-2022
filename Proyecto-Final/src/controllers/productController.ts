import { NextFunction, Request, Response } from 'express';
import { productAPI } from '../API/productAPI';

class ProductController {
	public async get(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		const dataReceived = await productAPI.get(id);

		if (dataReceived.length === 0) {
			res.status(404).send({ products: 'Not Found' });
			return;
		}

		res.status(200).send({ products: dataReceived });
		return;
	}

	public async add(req: Request, res: Response): Promise<void> {
		const productAdded = await productAPI.add(req.body);

		res.status(200).send({ msg: 'Product added successfully', product: productAdded });
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		const updatedResult = await productAPI.update(id, req.body);

		if (updatedResult) {
			res.status(200).send({ msg: 'Product updated successfully', product: updatedResult });
			return;
		}
		res.status(404).send({ product: 'Not Found' });
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		const daleteResult = await productAPI.delete(id);

		if (daleteResult === null) {
			res.status(404).send({ product: 'Not Found' });
			return;
		}
		res.status(200).send({ msg: 'Product delete successfully' });
		return;
	}
}

export const productController = new ProductController();
