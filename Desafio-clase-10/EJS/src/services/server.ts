import { errorHandler, notFound } from '../middleware/errorHandler';
import { create } from 'express-handlebars';
import indexRouter from '../routes/index';
import express from 'express';
import path from 'path';

export const app = express();

//Configuracion de Handlebars

//Obtengo los path absolutos de las carpetas necesarias.
const viewsFolderPath = path.resolve(__dirname, '../views');

app.set('views', viewsFolderPath);
app.set('view engine', 'ejs');

// Haciendo disponible la carpeta public
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

//Permite que express pueda manejar los datos de post y put.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurando rutas
app.use('/api', indexRouter);

//Manejo de errores
app.use(notFound);
app.use(errorHandler);
