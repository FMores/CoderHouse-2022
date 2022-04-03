import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	req.statusCode = 400;
	next(error);
};

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(error);
	}
	res.status(req.statusCode || 500).send({
		Error: {
			msg: error.message,
		},
	});
};
