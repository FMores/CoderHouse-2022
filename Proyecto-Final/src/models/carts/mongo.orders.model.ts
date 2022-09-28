import { Schema, model } from 'mongoose';

export const orderSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orders_qty: {
			type: Number,
			min: 0,
			default: 0,
			required: true,
		},
		orders: [
			{
				order_number: { type: Number, required: true },
				status: { type: String, default: 'Generated' },
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
							min: 0,
							default: 0,
							required: true,
						},
					},
				],
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default model('Order', orderSchema);
