import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { joiValidator } from '../middleware/joi.middleware';
import { newProduct, updateProduct } from '../models/products/joi.product.model';
import { productController } from '../controllers/products.controller';

const productsRouter = Router();

productsRouter.get('/', expressAsyncHandler(productController.get));

productsRouter.get('/:id', expressAsyncHandler(productController.get));

productsRouter.post(
    '/',
    joiValidator(newProduct),
    expressAsyncHandler(productController.post)
);

productsRouter.put(
    '/:id',
    joiValidator(updateProduct),
    expressAsyncHandler(productController.put)
);

productsRouter.delete('/:id', expressAsyncHandler(productController.delete));

export default productsRouter;
