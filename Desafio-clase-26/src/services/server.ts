import { errorHandler, notFound } from '../middleware/errorHandler';
import { create } from 'express-handlebars';
import indexRouter from '../routes/index';
import passport from '../middleware/auth';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from '../config';
import { Server } from 'http';
import express from 'express';
import path from 'path';

export const app = express();

//Configuracion de Handlebars
export const hbs = create({
	extname: 'hbs',
	layoutsDir: path.resolve(__dirname, '../../views/layouts'),
	defaultLayout: path.resolve(__dirname, '../../views/layouts/main'),
	partialsDir: path.resolve(__dirname, '../../views/partial'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../../views'));

// Haciendo disponible la carpeta public
app.use(express.static(path.resolve(__dirname, '../../public')));

//Permite que express pueda manejar los datos de post y put.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Permite que express utilice cookie-parse y session.
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

//Iniciamos passport
app.use(passport.initialize());
app.use(passport.session());

//Configurando rutas
app.use('/api', indexRouter);

//Manejo de errores
app.use(notFound);
app.use(errorHandler);

// Creamos un servidor con http para poder utilizar socket junto a express
export const httpServer = new Server(app);
