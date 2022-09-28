import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { newProduct, updateProduct } from '../models/products/joi.products.model';
import { productController } from '../controllers/products.controllers';
import { validator } from '../middleware/joi.validator';
import { isLoggedIn } from '../middleware/isLoggedIn';

const router = Router();

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
router.get('/:id?', expressAsyncHandler(productController.get));

// POST: '/' - Para incorporar productos al listado (disponible para administradores)
router.post('/', isLoggedIn, validator(newProduct), expressAsyncHandler(productController.post));

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
router.put('/:id', isLoggedIn, validator(updateProduct)),
	expressAsyncHandler(productController.put);

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
router.delete('/:id', isLoggedIn, expressAsyncHandler(productController.delete));

export default router;
