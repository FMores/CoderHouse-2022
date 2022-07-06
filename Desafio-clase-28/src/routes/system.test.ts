import { fork } from 'child_process';
import { Router, Request, Response } from 'express';
import path from 'path';
import { yargs } from '../config';

const router = Router();

router.get('/info', (req: Request, res: Response) => {
	res.status(200).send({
		Input_arguments: yargs,
		Execution_path: process.execPath,
		Platform_name: process.platform,
		Process_ID: process.pid,
		Nodejs_version: process.version,
		Project_folder: process.cwd(),
		Total_reserved_memory: process.memoryUsage(),
	});
});

const randomFunc_path = path.resolve(__dirname, '../utils/child_process.ts');

router.get('/random', (req: Request, res: Response) => {
	const { qty } = req.query;

	let args: readonly string[] | undefined = [];

	if (qty) {
		args = [qty.toString()];
	}

	const childRandom = fork(randomFunc_path, args);

	childRandom.send('start');
	childRandom.on('message', (result) => {
		res.status(200).send({
			random_numbers: result,
		});
	});
});

export default router;
