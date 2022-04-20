import { errorHandler, notFound } from '../middleware/errorHandler';
import { create } from 'express-handlebars';
import indexRouter from '../routes/index';
import { Server } from 'http';
import express from 'express';
import path from 'path';

export const app = express();

//Configuracion de Handlebars

//Obtengo los path absolutos de las carpetas necesarias.
const layoutFolderPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayoutFolderPath = path.resolve(__dirname, '../../views/layouts/main');
const partialsFolderPath = path.resolve(__dirname, '../../views/partials');
const viewsFolderPath = path.resolve(__dirname, '../../views');

const hbs = create({
	extname: 'hbs',
	layoutsDir: layoutFolderPath,
	defaultLayout: defaultLayoutFolderPath,
	partialsDir: partialsFolderPath,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

// Haciendo disponible la carpeta public
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

//Permite que express pueda manejar los datos de post y put.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurando rutas
app.use('/api', indexRouter);

// test sin utilizar router
app.get('/api2', (req, res) => {
	res.render('newProduct');
});

//Manejo de errores
app.use(notFound);
app.use(errorHandler);

// Creamos un servidor con http para poder utilizar socket junto a express
export const httpServer = new Server(app);
