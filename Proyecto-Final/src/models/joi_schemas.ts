import Joi, { ObjectSchema } from 'joi';

export const post_schema: ObjectSchema = Joi.object().keys({
	name: Joi.string().min(3).max(100).required(),
	description: Joi.string().min(1).max(200).required(),
	price: Joi.number().min(0).required().strict(),
	stock: Joi.number().integer().min(0).required().strict(),
	thumbnail: Joi.string().required(),
});

export const put_schema: ObjectSchema = Joi.object().keys({
	name: Joi.string().min(3).max(20).optional,
	description: Joi.string().min(1).max(200),
	price: Joi.number().min(0),
	stock: Joi.number().integer().min(0),
	thumbnail: Joi.string(),
});

export const MySQL_post_schema: ObjectSchema = Joi.object().keys({
	user_id: Joi.string().required(),
	product_id: Joi.string().required(),
});
