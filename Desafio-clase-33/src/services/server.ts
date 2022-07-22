import { errorHandler } from '../middleware/errorHandler';
import express, { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/winston.logger';
import { create } from 'express-handlebars';
import indexRouter from '../routes/index';
import passport from '../middleware/auth';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import session from 'express-session';
import config from '../config';
import { Server } from 'http';
import path from 'path';

export const app = express();

export const hbs = create({
	extname: 'hbs',
	layoutsDir: path.resolve(__dirname, '../../views/layouts'),
	defaultLayout: path.resolve(__dirname, '../../views/layouts/main'),
	partialsDir: path.resolve(__dirname, '../../views/partial'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../../views'));

//app.use(compression());
app.use(express.static(path.resolve(__dirname, '../../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_PARSER_SECRET));
app.use(
	session({
		secret: config.EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 20000,
		},
	}),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
	logger.info(`Method:${req.method}, Route:${req.originalUrl}`);
	next();
});

app.use('/api', indexRouter);

app.use(errorHandler);

// Creamos un servidor con http para poder utilizar socket junto a express
export const httpServer = new Server(app);
