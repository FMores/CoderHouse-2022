import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	req.statusCode = 400;
	next(error);
};

export const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const status = err.status || 500;
	const message = err.message || 'Something went wrong';
	res.status(status).send({ status, message });
};
