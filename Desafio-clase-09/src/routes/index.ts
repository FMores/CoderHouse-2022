import { Router } from 'express';
import productRouter from './products';

const router = Router();

router.use('/producto', productRouter);

export default router;
