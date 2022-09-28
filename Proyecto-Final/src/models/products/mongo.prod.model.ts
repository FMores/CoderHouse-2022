import { Schema, model, Types } from 'mongoose';
import { IProduct } from './product.interfaces';

export const productSchema: Schema = new Schema<IProduct>(
	{
		name: { type: String, required: true, max: 100 },
		description: { type: String, required: true, max: 250 },
		price: { type: Number, required: true, default: 0, min: 0 },
		photo: { type: String, required: true },
		category: { type: String, required: true, max: 100 },
		qty: { type: Number, default: 0, min: 0, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default model<IProduct>('Product', productSchema);
