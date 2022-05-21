import { post_schema, put_schema } from '../schemas/joi_schemas';
import { product_controller } from '../controllers/productController';
import { validator } from '../middleware/joi_validation';
import isAdmin from '../middleware/isAuth';
import { Router } from 'express';

const router = Router();

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
router.get('/:id?', product_controller.get);

// POST: '/' - Para incorporar productos al listado (disponible para administradores)
router.post('/', isAdmin, validator(post_schema), product_controller.save);

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
router.put('/:id', isAdmin, validator(put_schema), product_controller.updateById);

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
router.delete('/:id', isAdmin, product_controller.deleteById);

export default router;
