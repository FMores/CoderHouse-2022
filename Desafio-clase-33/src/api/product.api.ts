// import { logger } from '../utils/winston.logger';
// //import { mysql_service } from '../services/MySQL.Service';

// interface IProduct {
// 	id?: number;
// 	title: string;
// 	price: number;
// 	thumbnail: string;
// }

// class ProductsApi {
// 	constructor(private table_name: string = 'products') {}

// 	public getAll = async () => {
// 		try {
// 			const current_product_list = await mysql_service.get_all(this.table_name);
// 			if (current_product_list.length > 0) {
// 				return current_product_list;
// 			} else {
// 				return null;
// 			}
// 		} catch (err: any) {
// 			logger.error(`Class ProductApi function getAll() => error= ${err.message}`);
// 		}
// 	};

// 	public save = async (new_product_data: IProduct) => {
// 		try {
// 			await mysql_service.save(new_product_data, this.table_name);
// 		} catch (err: any) {
// 			logger.error(`Class ProductApi function save() => error= ${err.message}`);
// 		}
// 	};
// }

// export const product_api = new ProductsApi();
