import { errorHandler, notFound } from '../middleware/errorHandler';
import { create } from 'express-handlebars';
import indexRouter from '../routes/indexRouter';
import compression from 'compression';
import { Server } from 'http';
import express from 'express';
import helmet from 'helmet';
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
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

//Middlewares basicos necesarios.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(helmet());

//Configurando rutas
app.use('/api', indexRouter);

//Manejo de errores
app.use(notFound);
app.use(errorHandler);

// Creamos un servidor con http para poder utilizar socket junto a express y lo exportamos
export const httpServer = new Server(app);
