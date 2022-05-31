import { Schema, model } from 'mongoose';
import { ProductI } from 'src/DAO/interfaces';

export const ProductModel = new Schema<ProductI>(
	{
		name: {
			type: String,
			required: [true, 'Please include the product name'],
			max: 20,
		},
		description: {
			type: String,
			required: [true, 'Please include the product description'],
			max: 100,
		},
		price: {
			type: Number,
			required: [true, 'Please include the product price'],
		},
		stock: {
			type: Number,
			required: [true, 'Please include the product stock'],
		},
		thumbnail: {
			type: String,
			required: [true, 'Please include the product image'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default model<ProductI>('product', ProductModel);
