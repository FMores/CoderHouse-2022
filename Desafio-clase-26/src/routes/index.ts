import { Router } from 'express';
import productRouter from './products';
import usersRouter from './auth';

const router = Router();

router.use('/productos', productRouter);
router.use('/auth', usersRouter);

export default router;
