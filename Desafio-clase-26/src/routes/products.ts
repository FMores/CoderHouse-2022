import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import isAuth from '../middleware/isAuth';

const router = Router();

//Ruta para agregar un producto nuevo mediante un formulario
router.get(
	'/',
	isAuth,
	asyncHandler((req: Request, res: Response) => {
		const { uname } = req.session;
		res.render('index', { uname: uname });
	}),
);

//Ruta para agregar un producto nuevo mediante un formulario
router.get(
	'/test',
	asyncHandler((req: Request, res: Response) => {
		res.render('fake_product_list');
	}),
);

export default router;
