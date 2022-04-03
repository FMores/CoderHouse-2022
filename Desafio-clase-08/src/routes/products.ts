import { Router, Request, Response, NextFunction } from 'express';
import { productController } from '../controllers/products';
import upload from '../middleware/multer';

const router = Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/nuevo', productController.save);

router.put('/:id', productController.updateById);

router.delete('/:id', productController.deleteById);

router.post('/image/uploadsingle', upload.single('singleFile'), (req: Request, res: Response, next: NextFunction) => {
	const singleFile = req.file;
	if (!singleFile) {
		const error = new Error('Debes seleccionar una imagen para guardar');
		req.statusCode = 400;
		return next(error);
	}
	res.status(200).send({ msg: 'funciono el single' });
});

router.post(
	'/image/uploadmultiple',
	upload.array('multipleFile', 3),
	(req: Request, res: Response, next: NextFunction) => {
		const multipleFiles = req.files;
		if (!multipleFiles || multipleFiles.length === 0) {
			const error = new Error('Debes seleccionar al menos una imagen para guardar');
			req.statusCode = 400;
			return next(error);
		}
		res.status(200).send({ msg: 'funciono el multiple' });
	},
);

export default router;
