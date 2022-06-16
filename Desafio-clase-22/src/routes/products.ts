import { Router, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const router = Router();

//Ruta para agregar un producto nuevo mediante un formulario
router.get(
	'/',
	expressAsyncHandler((req: Request, res: Response) => {
		res.render('index');
	}),
);

//Ruta para agregar un producto nuevo mediante un formulario
router.get(
	'/test',
	expressAsyncHandler((req: Request, res: Response) => {
		res.render('fake_product_list');
	}),
);

export default router;
