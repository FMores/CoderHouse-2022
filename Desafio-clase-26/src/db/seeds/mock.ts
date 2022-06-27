import { Knex } from 'knex';

export const seed = async (knex: Knex): Promise<void> => {
	const init_products = [
		{
			title: 'cartuchera',
			price: 20,
			thumbnail: 'photo-cartuchera',
		},
		{
			title: 'pendrive',
			price: 20,
			thumbnail: 'photo-pendrive',
		},
	];

	try {
		await knex('products').del();
		await knex('products').insert(init_products);
	} catch (err: any) {
		throw Error(err);
	}
};
