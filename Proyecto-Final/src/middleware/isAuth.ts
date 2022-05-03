import { Request, Response, NextFunction } from 'express';

const admin: boolean = true;

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (admin) next();
	else
		res.status(401).send({
			error: -1,
			description: `route:${req.originalUrl} - method:${req.method} unauthorized`,
		});
};

export default isAdmin;
