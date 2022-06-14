import { Router, Request, Response } from 'express';

const router = Router();

//Ruta para agregar un producto nuevo mediante un formulario
router.get('/', (req: Request, res: Response) => {
	res.render('index');
});

//Ruta para agregar un producto nuevo mediante un formulario
router.get('/test', (req: Request, res: Response) => {
	res.render('fake_product_list');
});

export default router;
