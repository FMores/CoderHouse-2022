import { date_creator } from '../utils/date';
import { code_creator } from '../utils/uuid';
import fs from 'fs/promises';
import path from 'path';
import { product_persistence } from './products';
import e from 'express';

interface IProduct {
	id: string | number;
	name: string;
	price: number;
	thumbnail: string;
	description: string;
	code: number | string;
	stock: number;
	timestamp: string;
}

interface ICart {
	id: string | number;
	timestamp: string;
	products: Array<IProduct>;
}

class Cart_persistence {
	constructor(
		private fileName: string,
		private filePath = path.resolve(__dirname, `../db/${fileName}`),
	) {}

	private fileStat = async () => {
		const fileStats = await fs.stat(this.filePath);
		if (fileStats.size === 0) {
			await fs.writeFile(this.filePath, JSON.stringify([]));
			const fileInitialized = await fs.stat(this.filePath);
			return fileInitialized;
		}
		return fileStats;
	};

	private readFile = async () => {
		await this.fileStat();
		const dataStr = await fs.readFile(this.filePath, 'utf8');
		const dataObj = JSON.parse(dataStr);
		return dataObj;
	};

	private writeFile = async (data: ICart[]) => {
		await fs.writeFile(this.filePath, JSON.stringify(data, null, '\t'));
	};

	public getAll = async () => {
		try {
			const cart_list = await this.readFile();
			return cart_list;
		} catch (err: any) {
			throw Error(err);
		}
	};

	public create = async () => {
		try {
			const stats = await this.fileStat();
			const cart_id = await code_creator();
			const timestamp = await date_creator();
			if (stats.size > 2) {
				const current_list_of_carts = await this.readFile();
				const new_cart = { id: `CID-${cart_id}`, timestamp, products: [] };
				current_list_of_carts.push(new_cart);
				await this.writeFile(current_list_of_carts);
				return new_cart.id;
			} else {
				const new_cart = { id: `CID-${cart_id}`, timestamp, products: [] };
				const initial_array_of_carts = [new_cart];
				await this.writeFile(initial_array_of_carts);
				return new_cart.id;
			}
		} catch (err: any) {
			throw Error(err);
		}
	};

	public update = async (cart_id: string, newData: ICart) => {
		try {
			await this.fileStat();

			const current_cart_list = await this.readFile();
			const cart_index = current_cart_list.findIndex((el: IProduct) => el.id === cart_id);

			let cart_to_update = current_cart_list[cart_index];

			for (let val in newData) {
				if (newData[val]) {
					cart_to_update[val] = newData[val];
				}
			}

			current_cart_list.splice(cart_index, 1, cart_to_update);
			this.writeFile(current_cart_list);

			return;
		} catch (err: any) {
			throw Error(err);
		}
	};

	public add_product = async (cart_id: string, product_id: string) => {
		try {
			const current_list_of_carts = await this.readFile();
			const cart = current_list_of_carts.find((el: ICart) => el.id === cart_id);

			if (!cart) {
				throw Error('El ID ingresado no corresponde a ningun carrito');
			}

			const product = await product_persistence.getById(product_id);

			if (!product) {
				throw Error('El ID ingresado no corresponde a ningun producto');
			}

			cart.products.push(product);

			await this.update(cart_id, cart);

			return cart;
		} catch (err: any) {
			throw Error(err);
		}
	};

	public get_cart_products = async (cart_id: string) => {
		try {
			const cart_list = await this.readFile();
			const cart = cart_list.find((el: ICart) => el.id === cart_id);

			if (!cart) {
				throw Error('No existe carrito con el ID indicado');
			}

			const list_of_products = cart.products;

			return list_of_products;
		} catch (err: any) {
			throw Error(err);
		}
	};

	public delete_cart = async (cart_id: string) => {
		try {
			const cart_list = await this.readFile();
			const cart = cart_list.find((el: ICart) => el.id === cart_id);

			if (!cart) {
				throw Error('No existe carrito con el ID indicado');
			}

			const cart_list_updated = cart_list.filter((el: ICart) => el.id !== cart_id);

			await this.writeFile(cart_list_updated);
			return;
		} catch (err: any) {
			throw Error(err);
		}
	};

	public delete_product = async (cart_id: string, product_id: string) => {
		try {
			const current_list_of_carts = await this.readFile();
			const cart = current_list_of_carts.find((el: ICart) => el.id === cart_id);

			if (!cart) {
				throw Error('El ID ingresado no corresponde a ningun carrito');
			}

			const searched_product = cart.products.find((el: IProduct) => el.id === product_id);

			if (!searched_product) {
				throw Error('No se encuentra producto con el ID indicado');
			}

			const product_filtered = cart.products.filter((el: IProduct) => el.id !== product_id);

			cart.products = product_filtered;

			const cart_index = current_list_of_carts.findIndex((el: ICart) => el.id === cart_id);

			current_list_of_carts[cart_index] = cart;

			await this.writeFile(current_list_of_carts);

			return;
		} catch (err: any) {
			throw Error(err);
		}
	};
}

export const cart_persistence = new Cart_persistence('cart.txt');
