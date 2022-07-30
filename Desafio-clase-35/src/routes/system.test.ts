import { Router, Request, Response } from 'express';
import { EmailService } from '../services/email';
import { SmsService } from '../services/twilio';
import { random } from '../utils/num.random';
import config, { yargs } from '../config';
import { cpus } from 'os';

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
		const response = await SmsService.sendMessage(body.destination, body.content);

		res.json(response);
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
