import { number, object, ObjectSchema, string } from 'joi';

export const newProduct: ObjectSchema = object()
	.keys({
		name: string().min(3).required(),
		description: string().min(5).required(),
		price: number().min(0).default(0).required(),
		photo: string().required(),
		category: string().min(3).required(),
		qty: number().min(0).default(0).required(),
	})
	.options({ abortEarly: false, convert: false });

export const updateProduct: ObjectSchema = object()
	.keys({
		name: string().min(3),
		description: string().min(5),
		price: number().min(0).default(0),
		photo: string(),
		category: string().min(3),
		qty: number().min(0).default(0),
	})
	.options({ abortEarly: false, convert: false });
