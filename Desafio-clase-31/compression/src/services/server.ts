import express, { Request, Response } from 'express';
import data from '../DB/data';

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.status(200).send({ data_normal: data });
});

export default app;
