import { Router, Request, Response, NextFunction } from 'express';
import { validator } from '../middleware/validator.joi';
import signUp_logIn_Schema from '../models/joi.schemas';
import { isLoggedIn } from '../middleware/auth';
import passport from 'passport';

// De esta forma le digo a typescript que dentro de req.session van a existir los campos uname y upwd
declare module 'express-session' {
	export interface SessionData {
		auth: boolean;
		uname: string;
	}
}

const router = Router();

/*------------------------------------------------ */
/*-------------------- LOG IN -------------------- */
/*------------------------------------------------ */
router.get('/login', (req: Request, res: Response) => {
	res.render('logIn');
});

router.post(
	'/login',
	validator(signUp_logIn_Schema),
	passport.authenticate('login', {
		successRedirect: '/api/productos',
		failWithError: true,
	}),
	(err: any, req: Request, res: Response, next: NextFunction) => {
		res.render('invalidCredentials');
	},
);

/*------------------------------------------------- */
/*-------------------- SIGN UP -------------------- */
/*------------------------------------------------- */
router.get('/signup', (req: Request, res: Response) => {
	res.render('signup');
});

router.post('/signup', validator(signUp_logIn_Schema), (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('signup', function (err, user, info) {
		if (err) {
			return next(err);
		}

		if (!user) return res.render('userExist');

		res.redirect('/api/productos');
	})(req, res, next);
});

/*------------------------------------------------ */
/*-------------------- LOGOUT -------------------- */
/*------------------------------------------------ */
router.get('/logout', isLoggedIn, (req: Request, res: Response) => {
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
