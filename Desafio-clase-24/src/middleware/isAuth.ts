import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
	if (req.session && req.session.auth) {
		next();
	} else {
		res.redirect('auth');
	}
};

export default isAuth;
