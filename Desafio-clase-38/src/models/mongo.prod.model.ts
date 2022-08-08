import { Schema, model } from 'mongoose';

const productSchema = new Schema(
	{
		title: { type: String, required: true, max: 50 },
		price: { type: Number, required: true },
		thumbnail: { type: String, required: true, max: 400 },
		timestamp: { type: String, required: true },
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

export default model('product', productSchema);
