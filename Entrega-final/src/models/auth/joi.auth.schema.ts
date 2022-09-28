import { number, object, ObjectSchema, string } from 'joi';

export const signup: ObjectSchema = object().keys({
    fullName: string()
        .min(3)
        .max(100)
        .required()
        .label('User name is required, please add one.'),
    cellPhone: number()
        .min(8)
        .max(15)
        .required()
        .label('Phone number is required, pleasee add one.'),
    password: string()
        .alphanum()
        .min(6)
        .max(50)
        .required()
        .label('Insert valid passwort. Must be between 6 and 50 characters '),
    email: string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
});

export const login: ObjectSchema = object().keys({
    password: string()
        .alphanum()
        .min(4)
        .max(50)
        .required()
        .label('Insert valid passwort. Must be between 6 and 50 characters '),
    email: string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
});
