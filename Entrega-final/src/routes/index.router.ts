import { Router } from 'express';
import productsRouter from './products.router';

const indexRouter = Router();

indexRouter.use('/products', productsRouter);
// indexRouter.use('/messages');
// indexRouter.use('/user');

export default indexRouter;
