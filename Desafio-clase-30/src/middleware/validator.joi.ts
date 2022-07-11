import { Request, Response, NextFunction } from 'express';

export const validator = (schema: { validateAsync: (arg0: any) => any }) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { error } = await schema.validateAsync(req.body);
			const valid = error == null;
			if (valid) {
				next();
			} else {
				const { details } = error;
				throw Error(details);
			}
		} catch (error: any) {
			res.render('joiError');
		}
	};
};
