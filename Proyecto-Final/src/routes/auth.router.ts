import { multer_check_img, upload_single_img } from '../middleware/multer';
import { Router, Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../middleware/isLoggedIn';
import { validator } from '../middleware/joi.validator';
import { login } from '../models/auth/joi.auth.schema';
import { logger } from '../utils/winston.logger';
import passport from 'passport';

declare module 'express-session' {
	export interface SessionData {
		auth: boolean;
		uName: string;
	}
}

const router = Router();

/*----------------------------------------------- */
/*-------------------- LOGIN -------------------- */
/*----------------------------------------------- */
router.get('/login', (req: Request, res: Response) => {
	res.render('logIn');
});

router.get('/invalid-credentials', (req: Request, res: Response) => {
	res.render('invalidCredentials');
});

router.post(
	'/login',
	validator(login),
	passport.authenticate('login', {
		successRedirect: '/api',
		failureRedirect: '/api/auth/invalid-credentials',
		failWithError: true,
	}),
);

/*------------------------------------------------ */
/*-------------------- SIGNUP -------------------- */
/*------------------------------------------------ */
router.get('/signup', (req: Request, res: Response) => {
	res.render('signup');
});

router.post(
	'/signup',
	upload_single_img,
	multer_check_img,
	(req: Request, res: Response, next: NextFunction) => {
		passport.authenticate('signup', async function (err, user, info) {
			if (err) {
				logger.error(`Signup error: ${err}`);
				return next(err);
			}

			if (!user) {
				logger.error(`Signup invalid user: ${info}`);
				return res.render('userExist');
			}
			res.redirect('/api');
		})(req, res, next);
	},
);

/*------------------------------------------------ */
/*-------------------- LOGOUT -------------------- */
/*------------------------------------------------ */
router.get('/logout', isLoggedIn, (req: Request, res: Response) => {
	const uEmail = req.user!.email;

	req.session.destroy((e) => {
		if (e) {
			throw new Error(e.message);
		}
		return res.render('logout', { uEmail });
	});
});

export default router;
