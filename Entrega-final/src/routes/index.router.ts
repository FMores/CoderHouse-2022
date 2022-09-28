import { Router } from 'express';
import { authRouter } from './auth.router';
import { homeRouter } from './home.router';
import productsRouter from './products.router';

const indexRouter = Router();

indexRouter.use('/', homeRouter);
indexRouter.use('/auth', authRouter);
indexRouter.use('/products', productsRouter);
// indexRouter.use('/messages');
// indexRouter.use('/user');

export default indexRouter;
