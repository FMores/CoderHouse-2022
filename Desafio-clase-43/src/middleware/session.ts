import config from '../config';

export const sessionConfig = {
	secret: config.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 20000,
	},
};
