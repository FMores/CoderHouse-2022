import { Router, Request, Response } from 'express';
import path from 'path';
import { random } from '../utils/child.num.random';
import config, { yargs } from '../config';
import os from 'os';

const numCPUs = os.cpus().length;

const router = Router();

router.get('/info', (req: Request, res: Response) => {
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

export default router;
