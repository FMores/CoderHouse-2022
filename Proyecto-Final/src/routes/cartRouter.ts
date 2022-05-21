import { Router } from 'express';
import isAdmin from '../middleware/isAuth';
import { cart_controller } from '../controllers/cart';

const router = Router();

// GET: '/' - Me permite listar todos los carritos - solo para admin
router.get('/', isAdmin, cart_controller.getAll);

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/:id/productos', cart_controller.cart_products);

// POST: '/' - Crea un carrito y devuelve su id.
router.post('/', cart_controller.create);

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito, se pasa id de producto por body
router.post('/:id/productos', cart_controller.add_product);

// DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/:id', cart_controller.delete_cart);

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:id_prod', cart_controller.delete_product);

export default router;
