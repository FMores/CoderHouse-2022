import { number, object, ObjectSchema, string } from 'joi';

export const signup: ObjectSchema = object().keys({
	full_name: string().min(3).max(100).required(),
	adress: string().min(6).max(250).required(),
	age: number().required(),
	phone_number: number().min(8).max(15).required(),
	profile_picture: string().required(),
	password: string().alphanum().min(6).max(50).required(),
	email: string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
});

export const login: ObjectSchema = object().keys({
	password: string().alphanum().min(4).max(50).required(),
	email: string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
});
