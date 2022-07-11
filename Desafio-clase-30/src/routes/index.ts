import productRouter from './products';
import systemInfoRouter from './system.test';
import { Router } from 'express';
import usersRouter from './auth';

const router = Router();

router.use('/productos', productRouter);
router.use('/auth', usersRouter);
router.use('/system', systemInfoRouter);

export default router;
