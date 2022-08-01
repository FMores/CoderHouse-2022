import { multer_check_img, upload_single_img } from '../middleware/multer';
import { Router, Request, Response, NextFunction } from 'express';
import { validator } from '../middleware/joi.validator';
import { isLoggedIn } from '../middleware/passport.auth';
import { login } from '../models/joi.schemas';
import passport from 'passport';

declare module 'express-session' {
	export interface SessionData {
		auth: boolean;
		uname: string;
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
		successRedirect: '/api/home',
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

router.post('/signup', upload_single_img, multer_check_img, (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('signup', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) return res.render('userExist');

		res.redirect('/api/home');
	})(req, res, next);
});

/*------------------------------------------------ */
/*-------------------- LOGOUT -------------------- */
/*------------------------------------------------ */
router.get('/logout', (req: Request, res: Response) => {
	let uEmail: string;

	if (req.user) {
		uEmail = req.user.email;
	}

	req.session.destroy((e) => {
		if (e) {
			throw new Error(e.message);
		}
		return res.render('logout', { uEmail });
	});
});

export default router;
