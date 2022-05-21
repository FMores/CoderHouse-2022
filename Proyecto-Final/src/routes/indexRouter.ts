import { Router } from 'express';
import product_router from './productRouter';
import cart_router from '../routes/cartRouter';

const router = Router();

router.use('/productos', product_router);
router.use('/carrito', cart_router);

export default router;
