import mongoProdModel from '../../../models/products/mongo.prod.model';
import mongoUserModel from '../../../models/users/mongo.user.model';
import { email_order } from '../../../utils/mail.template';
import { EmailService } from '../../../services/email';
import { ICart, INewCart } from '../carts.interfaces';
import mongoOrdersModel from '../mongo.orders.model';
import mongoCartsModel from '../mongo.carts.model';
import { Types } from 'mongoose';

export class MongoDBCartsDAO {
	private cartsCollection: any;
	private productsCollection: any;
	private ordersCollection: any;
	private usersCollection: any;

	constructor(private readonly dataBase: 'mongoDB_local' | 'mongoDB_atlas') {
		this.cartsCollection = mongoCartsModel;
		this.productsCollection = mongoProdModel;
		this.ordersCollection = mongoOrdersModel;
		this.usersCollection = mongoUserModel;
	}

	private checkId(id: string): void {
		const ObjectId = Types.ObjectId;

		if (id && !ObjectId.isValid(id)) {
			throw { status: 400, message: 'Invalid id' };
		}
	}

	private async findProductById(prod_id: string) {
		return await this.productsCollection.findById(prod_id);
	}

	async get(user_id: string): Promise<ICart[]> {
		this.checkId(user_id!);

		const cartById = await this.cartsCollection
			.find({ user: user_id })
			.populate({ path: 'user', select: '_id full_name email adress phone_number' })
			.populate('items.product');

		return cartById;
	}

	async post(user_id: string, prod_id: string, prod_qty?: number | undefined): Promise<ICart[]> {
		// Verifico que el id de producto es valido.
		this.checkId(prod_id);

		// Verifico que el producto existe en la DB
		if (!(await this.findProductById(prod_id))) {
			throw { status: 404, message: 'The product does not exist in the database!' };
		}

		// Obtengo el carrito del usuario
		const userCart = await this.cartsCollection.find({ user: user_id });

		// Consulto si el producto ya se encuentra en el carrito.
		const productInCart = userCart[0].items.filter((el: any) => el.product.toString() === prod_id);

		// Si el producto existe, modifico la cantidad y guardo.
		if (productInCart.length > 0) {
			const updatedProductInCart = await this.cartsCollection.findOneAndUpdate(
				{ user: user_id, 'items.product': prod_id },
				{ $inc: { 'items.$.qty': 1 } },
				{ new: true },
			);
			return updatedProductInCart;
		}

		// Si no existe el producto en el carro, lo agrego.
		const newProductSavedToCart = await this.cartsCollection.findOneAndUpdate(
			{ user: user_id },
			{ $push: { items: { product: prod_id, qty: 1 } } },
			{ new: true },
		);

		return newProductSavedToCart;
	}

	async put(data: ICart, id: string): Promise<ICart[]> {
		throw { status: 'Error', message: 'Method not implemented' };
	}

	async delete(user_id: string, prod_id: string): Promise<string> {
		// Verifico que el id de producto es valido.
		this.checkId(prod_id);

		// Verifico que el producto existe en la DB
		if (!(await this.findProductById(prod_id))) {
			throw { status: 404, message: 'The product does not exist in the database!' };
		}

		// Obtengo el carrito del usuario
		const userCart = await this.cartsCollection.find({ user: user_id });

		// Consulto si el producto ya se encuentra en el carrito.
		const producInCart = userCart[0].items.filter((el: any) => el.product.toString() === prod_id);

		if (producInCart.length === 0) {
			throw { status: 404, message: 'Product Not Found!' };
		}

		//Esta linea sirve para eliminar el producto del array cuando detecta que ya se elimino el ultimo.
		await this.cartsCollection.updateOne(
			{ user: user_id },
			{ $pull: { items: { product: prod_id } } },
		);

		return prod_id;
	}

	async checkout(user_id: string, user_email: string): Promise<any> {
		// Obtengo los datos del usuario
		const userData = await this.usersCollection.findOne({ _id: user_id });

		// Obtengo los datos del carrito del cliente.
		const userCart = await this.cartsCollection.findOne({ user: user_id });

		// Obtengo los productos del carrito para enviarlos por email. (linea 166)
		const cartProducts = await this.get(user_id);

		// Obtengo las ordenes del cliente si es que existen
		const userOrders = await this.ordersCollection.findOne({ user: user_id });

		// Si el carrito esta vacio, termino la funcion.
		if (userCart.items.length === 0) throw { status: 404, message: 'Empty cart' };

		// Creo la orden.
		const newOrder = {
			order_number: userOrders.orders_qty + 1,
			status: 'Generated',
			items: [...userCart.items],
		};

		// Guardo la orden en la lista de ordenes del cliente
		const newOrderData = await this.ordersCollection.findOneAndUpdate(
			{ user: user_id },
			{
				$push: { orders: newOrder },
				$inc: { orders_qty: 1 },
			},
			{ new: true },
		);

		// Borro el carrito.
		await this.cartsCollection.findOneAndUpdate({ user: user_id }, { $set: { items: [] } });

		// Envio productos y numero de oden de copra para general template y enviar por mail.
		const contentEmail = email_order(cartProducts[0].items, newOrderData.orders_qty);

		// E-mail al usuario con la orden de compra.
		await EmailService.sendEmail(
			userData.email,
			`Orden de compra N°${newOrderData.orders_qty}  - ${userData.email}`,
			contentEmail,
		);

		return;
	}

	async getOrder(user_id: string): Promise<any> {
		const order = await this.ordersCollection
			.findOne({ user: user_id })
			.populate({ path: 'user', select: '_id email' })
			.populate({
				path: 'orders',
				populate: { path: 'items.product', select: 'name description price photo ' },
			});

		console.log('getOrder:', order);

		return order;
	}
}
