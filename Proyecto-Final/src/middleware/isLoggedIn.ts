import { Request, Response } from 'express';

export const isLoggedIn = (req: Request, res: Response, done: any) => {
	if (!req.user) return res.redirect('/api/auth/login');
	done();
};
