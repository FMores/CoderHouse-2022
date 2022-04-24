import { Router } from 'express';
import productRouter from './products';

const router = Router();

router.use('/productos', productRouter);

export default router;
