import compression from 'compression';
import express, { Request, Response } from 'express';
import data from '../DB/data';

const app = express();

app.use(compression());

app.get('/', (req: Request, res: Response) => {
	res.status(200).send({ data_comprimida: data });
});

export default app;
