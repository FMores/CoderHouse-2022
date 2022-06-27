import { Router, Request, Response } from 'express';

// De esta forma le digo a typescript que dentro de req.session van a existir los campos uname y upwd
declare module 'express-session' {
	export interface SessionData {
		auth: boolean;
		uname: string;
	}
}

const router = Router();

let uName: string = 'admin';
let uPwd: string = 'admin';

router.get('/', (req: Request, res: Response) => {
	res.render('logIn');
});

router.post('/login', (req: Request, res: Response) => {
	const { uname, upwd } = req.body;

	if (uname === uName && upwd == uPwd) {
		if (req.session) {
			req.session.auth = true;
			req.session.uname = uname;
		}

		res.redirect('/api/productos');
	} else {
		res.redirect('/api/auth');
	}
});

router.get('/logout', (req: Request, res: Response) => {
	req.session.destroy((e) => {
		if (e) {
			throw new Error(e.message);
		}
		return res.redirect('/api/auth/saygoodbye');
	});
});

router.get('/saygoodbye', (req: Request, res: Response) => {
	res.render('logout', { uName });
});

export default router;
