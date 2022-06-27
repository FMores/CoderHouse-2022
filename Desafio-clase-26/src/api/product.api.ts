import { faker } from '@faker-js/faker';

export class ProductsApi {
	public static getFakeData() {
		const randomProductArray = [];

		for (let e = 0; e < 5; e++) {
			randomProductArray.push({
				_id: faker.database.mongodbObjectId(),
				name: faker.commerce.productName(),
				price: faker.commerce.price(1, 1000, 2, '$'),
				image: faker.image.business(undefined, undefined, true),
			});
		}

		return randomProductArray;
	}
}
