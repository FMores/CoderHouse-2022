import config from '../config';
import session from 'express-session';

export const session_config = session({
	secret: config.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: Number(config.COOKIE_EXPIRES_TIME),
	},
});
