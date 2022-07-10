import { Router, Request, Response } from 'express';

const router = Router();

/* Ruta sin nada raro en particular, solo envia un saludo */
router.get('/', (req: Request, res: Response) => {
	res.send({
		pid: process.pid,
		msg: 'HOLA',
	});
});

/* Ruta que genera un procesi bloqueante que mantiene ocupado al procesador */
router.get('/slow', function (req: Request, res: Response) {
	console.log(`PID => ${process.pid} will work slow`);
	let sum = 0;
	for (let i = 0; i < 6e9; i++) {
		sum += i;
	}

	res.send({
		pid: process.pid,
		sum,
	});
});

/* 
Ruta que mata al proceso. Sirve para poder ver como se ejecuta el cluster.on('exit',()=>{})
y crea un nuevo esclavo.
*/
router.get('/muerte', (req: Request, res: Response) => {
	res.send({ msg: 'OK' });
	console.log(`PID => ${process.pid} will die`);
	process.exit(0);
});

export default router;
