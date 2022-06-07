import { Router } from 'express';
import isAdmin from '../middleware/isAuth';
import { cartController } from '../controllers/cart.Controller';
import { validator } from '../middleware/joi_validation';
import { MySQL_post_schema, post_schema } from '../models/joi_schemas';

const router = Router();

// Harcoded userId = '628c290ebeed9a7b4df6b722';

// GET: '/' - Me permite listar todos los carritos - solo para admin
router.get('/', isAdmin, cartController.getAll);

// GET: '/:id/cart' - Me permite listar todos los productos guardados en el carrito pasando el id del usuario
router.get('/:id', cartController.get);

// POST: '/:id/cart' - Para incorporar productos al carrito utilizando el id del usuario y el id de producto por params
//router.post('/:id/product/:id_prod', validator(post_schema), cartController.add);

//Para utilizar con SQL
router.post('/:id/product/:id_prod', validator(MySQL_post_schema), cartController.add);

// DELETE: '/:id/cart/:id_prod' - Eliminar un producto del carrito utilizando el id del usuario y el id de producto por params
router.delete('/:id/product/:id_prod', cartController.delete);

export default router;
