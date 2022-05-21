import { NextFunction, Request, Response } from 'express';
import { product_persistence } from '../DAO/products/productDAO';

class Product_controller {
	public get = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			if (id) {
				const product_by_id = await product_persistence.getById(id);
				res.status(200).send({ product: product_by_id });
				return;
			} else {
				const current_product_list = await product_persistence.getAll();
				res.status(200).send({ products: current_product_list });
				return;
			}
		} catch (err: any) {
			next(err);
		}
	};

	public save = async (req: Request, res: Response, next: NextFunction) => {
		const { name, description, price, stock, thumbnail } = req.body;
		const new_product = { name, description, price, stock, thumbnail };
		try {
			const product_saved = await product_persistence.save(new_product);
			res.status(200).send({ product_added: product_saved });
		} catch (err: any) {
			next(err);
		}
	};

	public updateById = async (req: Request, res: Response, next: NextFunction) => {
		const { name, price, thumbnail, description, stock } = req.body;
		const new_data = { name, price, thumbnail, description, stock };
		const { id } = req.params;
		try {
			const product_updated = await product_persistence.updateById({ id, ...new_data });
			res.status(200).send({ product_updated });
		} catch (err: any) {
			next(err);
		}
	};

	public deleteById = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			await product_persistence.deleteById(id);
			res.status(200).send({ status: 'Successfully completed' });
		} catch (err: any) {
			next(err);
		}
	};
}

export const product_controller = new Product_controller();
