import express, { urlencoded, json, Express } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import indexRouter from '../routes/index.router';
import { session_config } from '../middleware';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import compression from 'compression';
import passport from 'passport';
import config from '../config';
import { Server } from 'http';
import path from 'path';

const app: Express = express();

const hbs = create({
    extname: 'hbs',
    layoutsDir: path.resolve(__dirname, '../../views/layouts'),
    defaultLayout: path.resolve(__dirname, '../../views/layouts/main'),
    partialsDir: path.resolve(__dirname, '../../views/partials'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../../views'));

app.use(express.static(path.resolve(__dirname, '../../public')));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser(config.COOKIE_PARSER_SECRET));
app.use(session_config);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', indexRouter);

app.use((req, res, next) => {
    next(createError(404));
});
app.use(errorHandler);

export const httpServer: Server = new Server(app);
