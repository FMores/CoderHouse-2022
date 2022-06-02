import { Router } from 'express';
import product_router from './product.Router';
import cart_router from '../routes/cart.Router';

const router = Router();

router.use('/productos', product_router);
router.use('/carrito', cart_router);

export default router;
