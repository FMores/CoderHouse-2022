import { Router, Request, Response } from 'express';

const router = Router();

router.get('/info', (req: Request, res: Response) => {
	res.status(200).send({
		Input_arguments: '',
		Execution_path: process.cwd(),
		Platform_name: process.platform,
		Process_ID: process.pid,
		Nodejs_version: process.version,
		Project_folder: '',
		Total_reserved_memory: process.memoryUsage(),
	});
});
