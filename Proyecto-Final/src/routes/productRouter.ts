import { post_schema, put_schema } from '../schemas/joi_schemas';
import { productController } from '../controllers/productController';
import { validator } from '../middleware/joi_validation';
import isAdmin from '../middleware/isAuth';
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';

const router = Router();

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
router.get('/:id?', expressAsyncHandler(productController.get));

// POST: '/' - Para incorporar productos al listado (disponible para administradores)
router.post('/', isAdmin, validator(post_schema), expressAsyncHandler(productController.add));

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
router.put('/:id', isAdmin, validator(put_schema), expressAsyncHandler(productController.update));

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
router.delete('/:id', isAdmin, expressAsyncHandler(productController.delete));

export default router;
