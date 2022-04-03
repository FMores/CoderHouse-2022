import express from 'express';
import indexRouter from '../routes/index';
import path from 'path';
import { errorHandler, notFound } from '../middleware/errorHandler';

export const app = express();

// Haciendo disponible la carpeta public
const staticFolderPath = path.resolve(__dirname, '../../public');
app.use('/static', express.static(staticFolderPath));

//Permite que express pueda manejar los datos de post y put.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurando rutas
app.use('/api', indexRouter);

//Manejo de errores
app.use(notFound);
app.use(errorHandler);
