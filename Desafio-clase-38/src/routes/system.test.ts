import { mobile_messaging_service } from '../services/twilio';
import { Router, Request, Response } from 'express';
import { EmailService } from '../services/email';
import { random } from '../utils/num.random';
import config, { yargs } from '../config';
import { cpus } from 'os';
import { logger } from '../utils/winston.logger';

const numCPUs = cpus().length;

const router = Router();

router.get('/info', (req: Request, res: Response) => {
	//console.log('resolviendo ruta /info con  console.log');

	res.status(200).send({
		Project_folder: process.cwd(),
		Execution_path: process.execPath,
		Nodejs_version: process.version,
		Platform_name: process.platform,
		Server_port: config.SERVER_PORT,
		Process_ID: process.pid,
		Total_reserved_memory: process.memoryUsage(),
		Input_arguments: yargs,
		Qty_processors: numCPUs,
	});
});

router.get('/random', (req: Request, res: Response) => {
	const { qty } = req.query;

	const numRandom = random(Number(qty));

	res.status(200).send({
		Server_port: config.SERVER_PORT,
		Process_ID: process.pid,
		Random_numbers: numRandom,
	});
});

/* ---------------------------------------------- */
/* -------------- NODE MAILER TEST -------------- */
/* ---------------------------------------------- */

router.get('/', (req, res) => {
	console.log('Resolving / endpoint');
	res.json({
		pid: process.pid,
		msg: `HOLA`,
	});
});

router.post('/send-email', async (req, res) => {
	const { body } = req;

	const destination = config.GMAIL_EMAIL;
	const subject = 'Hola Juan Carlos2!';
	const content = `
	<h1>HOLAAAA</h1>
	<p> Te queriamos dar la bienvenida a este mundo de nodemailer</p>
	`;

	try {
		const response = await EmailService.sendEmail(destination, subject, content);

		res.json(response);
	} catch (err) {
		res.status(500).json(err);
	}
});

/* ---------------------------------------------- */
/* -------------- NODE TWILIO TEST -------------- */
/* ---------------------------------------------- */

router.get('/', (req, res) => {
	console.log('Resolving / endpoint');
	res.json({
		pid: process.pid,
		msg: `HOLA`,
	});
});

router.post('/send-twilio-msg', async (req, res) => {
	const { body } = req;

	if (!body || !body.destination || !body.content)
		return res.status(400).json({
			msg: "mandame en el body el 'destination' y el 'content'",
			body,
		});

	try {
		/* PARA UTILIZAR CON MENSAJES CLASICOS (SMS) */
		//const response = await mobile_messaging_service.sendSms(body.destination, body.content);

		/* PARA UTILIZAR CON WHATSAPP */
		const response = await mobile_messaging_service.sendWsp(body.destination, body.content, body.picture);

		res.json(response);
	} catch (err: any) {
		logger.error(`Message error from twilio messaging service: ${err.message}`);
		res.status(500).json(err);
	}
});

/* RUTA PARA RECIBIR LAS RESPUESTAS DE WSP */
router.post('/receive', (req, res) => {
	console.log(req.body);
	res.json({ msg: 'OK' });
});

export default router;
