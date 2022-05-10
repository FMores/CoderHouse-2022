import { Router, Request, Response } from 'express';

const router = Router();

//Ruta para agregar un producto nuevo mediante un formulario
router.get('/', (req: Request, res: Response) => {
	res.render('index');
});

export default router;
