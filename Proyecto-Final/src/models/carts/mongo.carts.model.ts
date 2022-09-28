import { Schema, model } from 'mongoose';
import { ICart } from './carts.interfaces';

export const cartSchema: Schema = new Schema<ICart>(
	{
		user: {
			_id: false,
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		items: [
			{
				_id: false,
				product: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
				qty: {
					type: Number,
					default: 0,
					min: 0,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default model<ICart>('Cart', cartSchema);
