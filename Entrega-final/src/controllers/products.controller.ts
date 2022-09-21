import { productAPI } from '../api/product.api';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';

class ProductController implements BaseController {
    /**
     * Get all products or find by id from API
     */
    async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const resultGetProducts = await productAPI.get(id);

        if (resultGetProducts) {
            res.status(200).send({
                status: 'Successfull',
                quantity: resultGetProducts.length,
                products: resultGetProducts,
            });
            return;
        } else {
            res.status(404).send({ status: '404 - Not Found', products: null });
            return;
        }
    }

    /**
     * Add products from API
     */
    async post(req: Request, res: Response): Promise<void> {
        const resultAddProduct = await productAPI.post(req.body);
        res.status(200).send({
            status: 'Successfull',
            product: resultAddProduct,
        });
    }

    /**
     * Update a product by id from API
     */
    async put(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resultProductUpdated = await productAPI.put(req.body, id);

        if (resultProductUpdated) {
            res.status(200).send({
                status: 'Successfull',
                product: resultProductUpdated,
            });
            return;
        } else {
            res.status(404).send({ status: '404 - Not Found', products: null });
            return;
        }
    }

    /**
     * Delete a product by id from API
     */
    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const productDeletedId = await productAPI.delete(id);

        if (productDeletedId) {
            res.status(200).send({
                status: 'Successfull',
                product: { status: 'Deleted', productId: productDeletedId },
            });
            return;
        }
        res.status(404).send({ status: '404 - Not Found', productId: null });
        return;
    }
}

export const productController = new ProductController();
