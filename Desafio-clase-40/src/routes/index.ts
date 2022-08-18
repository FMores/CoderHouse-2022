import productRouter from '../models/products/prod.routes';
import systemInfoRouter from './system.test';
import { Router } from 'express';
import usersRouter from '../models/users/auth.routes';

const router = Router();

router.use('/productos', productRouter);
router.use('/auth', usersRouter);
router.use('/system', systemInfoRouter);

export default router;
