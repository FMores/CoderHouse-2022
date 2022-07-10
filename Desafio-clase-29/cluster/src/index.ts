import { app } from './services/server';
import indexRouter from './routes';
import { config } from './config';
import cluster from 'cluster';
import os from 'os';

const server = app;

app.use('/api', indexRouter);

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
	const cpuToUse = 4;

	console.log(`Numero de CPUs de mi pc:${numCPUs}`);
	console.log(`Numero de CPUs a utilizar: ${cpuToUse}`);
	console.log(`PID Master:${process.pid}`);

	for (let cpu = cpuToUse; cpu < numCPUs; cpu++) {
		cluster.fork();
	}

	cluster.on('exit', (WORKER) => {
		console.log(`PID => ${WORKER.process.pid} will die at:${Date()}`);
		cluster.fork();
	});
} else {
	server.listen(config.SERVER_PORT, () => {
		console.log(`Server runnign on port:${config.SERVER_PORT} => PID WORKER:${process.pid}`);
	});
}
