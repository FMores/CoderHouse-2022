import Joi, { ObjectSchema } from 'joi';

const signUp_logIn_Schema: ObjectSchema = Joi.object().keys({
	password: Joi.string().min(4).max(40),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
});

export default signUp_logIn_Schema;
