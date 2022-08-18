import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { isLoggedIn } from '../../middleware/auth';

const router = Router();

/* Ruta para agregar un producto nuevo mediante un formulario */
router.get(
	'/',
	isLoggedIn,
	asyncHandler((req: Request, res: Response) => {
		const uEmail = req.user?.email;
		res.render('index', { uEmail });
	}),
);

/* Ruta para agregar un producto nuevo mediante un formulario */
router.get(
	'/test',
	asyncHandler((req: Request, res: Response) => {
		res.render('fake_product_list');
	}),
);

export default router;
