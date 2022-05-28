import { Schema, model } from 'mongoose';
import { ProductI } from 'src/DAO/interfaces';

const productSchema = new Schema(
	{
		name: { type: String, required: true, max: 20 },
		description: { type: String, required: true, max: 100 },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		thumbnail: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default model<ProductI>('product', productSchema);
