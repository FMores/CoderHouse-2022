import { ProductsApi } from '../api/product.api';
import { mysql_service } from '../services/Mysql';

interface IProduct {
	id?: number;
	title: string;
	price: number;
	thumbnail: string;
}

class Container {
	constructor(private table_name: string) {}

	public getFakeData = async () => {
		return ProductsApi.getFakeData();
	};

	public getAll = async () => {
		try {
			const current_product_list = await mysql_service.get_all(this.table_name);
			if (current_product_list.length > 0) {
				return current_product_list;
			} else {
				return null;
			}
		} catch (err: any) {
			console.log('Algo salio mal:', err.message);
		}
	};

	public save = async (new_product_data: IProduct) => {
		try {
			await mysql_service.save(new_product_data, this.table_name);
		} catch (err: any) {
			console.log('Algo salio mal:', err.message);
		}
	};
}

export const productController = new Container('products');
