import { Router, Request, Response } from 'express';
import productRouter from './products.router';
import cartRouter from '../routes/carts.router';
import authRouter from './auth.router';
import { isLoggedIn } from '../models/auth/passport.auth';

const router = Router();

router.get('/', isLoggedIn, (req: Request, res: Response) => {
	const uEmail = req.user!.email;
	res.render('index', { uEmail });
});

router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/auth', authRouter);

export default router;
