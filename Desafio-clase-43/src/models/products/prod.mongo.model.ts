import { Schema, model } from 'mongoose';
import { IProduct } from './prod.interfaces';

const productSchema = new Schema(
	{
		name: { type: String, required: true, max: 50 },
		price: { type: Number, required: true },
		thumbnail: { type: String, required: true, max: 400 },
		timestamp: { type: String, required: true },
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

export default model<IProduct>('product', productSchema);
