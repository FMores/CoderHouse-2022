//import { mongoConnection } from './services/Mongo.Service';
//import { mysql_service } from './services/MySQL.Service';
//import { PersistenceType } from './DAO/interfaces';
//import { ioService } from './services/Socket.Service';
import { httpServer } from './services/server';
import config, { yargs } from './config';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary && config.SERVER_MODE) {
	const cpuToUse: number = 4;

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
	httpServer.listen(config.SERVER_PORT, () => {
		console.log(`Server runnign on port:${config.SERVER_PORT} => PID WORKER:${process.pid}`);
		//mongoConnection(PersistenceType.Mongo);
		//ioService.init(httpServer);
		//mysql_service.init();
	});
}
