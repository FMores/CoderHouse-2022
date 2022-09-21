import express, { urlencoded, json } from 'express';
import { Server } from 'http';
import path from 'path';
import { errorHandler } from '../middleware/errorHandler';
import indexRouter from '../routes/index.router';
import createError from 'http-errors';

const app = express();
app.use(express.static(path.resolve(__dirname, '../../public')));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', indexRouter);
app.use((req, res, next) => {
    next(createError(404));
});
app.use(errorHandler);

export const httpServer = new Server(app);
