import { cartController } from '../controllers/carts.controllers';
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isLoggedIn } from '../models/auth/passport.auth';

const cartRouter = Router();

// Buscar carrito por id de usuario logueado
cartRouter.get('/', isLoggedIn, expressAsyncHandler(cartController.get));

// Agrega un producto al carrito pasando el id por req.body
cartRouter.post('/', isLoggedIn, expressAsyncHandler(cartController.post));

// Actualiza un producto del carrito pasando id del producto por req.params
cartRouter.put('/:prod_id', isLoggedIn, expressAsyncHandler(cartController.put));

// Eliminar un producto del carrito pasando id del producto por req.params
cartRouter.delete('/:prod_id', isLoggedIn, expressAsyncHandler(cartController.delete));

cartRouter.post('/checkout', isLoggedIn, expressAsyncHandler(cartController.checkout));

cartRouter.get('/order', isLoggedIn, expressAsyncHandler(cartController.getOrder));

export default cartRouter;
