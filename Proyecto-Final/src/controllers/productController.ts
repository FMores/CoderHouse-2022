import { NextFunction, Request, Response } from 'express';
import { productAPI } from '../API/productAPI';

class ProductController {
	public async get(req: Request, res: Response) {
		const { id } = req.params;
		const dataReceived = await productAPI.get(id);
		res.status(200).send(dataReceived);
	}

	public async add(req: Request, res: Response) {
		const productAdded = await productAPI.add(req.body);
		res.status(200).send({ msg: 'Product added successfully', product: productAdded });
	}

	public async update(req: Request, res: Response) {
		const { id } = req.params;
		const updatedProduct = await productAPI.update(id, req.body);
		res.status(200).send({ msg: 'Product updated successfully', product: updatedProduct });
	}

	public async delete(req: Request, res: Response) {
		const { id } = req.params;
		await productAPI.delete(id);
		res.status(200).send({ msg: 'Product delete successfully' });
	}
}

export const productController = new ProductController();
