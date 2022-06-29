import productRouter from './products';
import { Router } from 'express';
import usersRouter from './auth';

const router = Router();

router.use('/productos', productRouter);
router.use('/auth', usersRouter);

export default router;
