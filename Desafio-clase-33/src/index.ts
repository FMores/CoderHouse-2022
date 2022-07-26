import { mongoConnection } from './services/Mongo.Service';
//import { mysql_service } from './services/MySQL.Service';
//import { PersistenceType } from './DAO/interfaces';
import { ioService } from './services/Socket.Service';
import { logger } from './utils/winston.logger';
import { httpServer } from './services/server';
import config, { yargs } from './config';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

const PORT = process.env.PORT || 8080;

if (cluster.isPrimary && config.SERVER_MODE === 'cluster') {
	const cpuToUse: number = 4;

	logger.info(`Numero de CPUs de mi pc:${numCPUs}`);
	logger.info(`Numero de CPUs a utilizar: ${cpuToUse}`);
	logger.info(`PID Master:${process.pid}`);

	for (let cpu = cpuToUse; cpu < numCPUs; cpu++) {
		cluster.fork();
	}

	cluster.on('exit', (WORKER) => {
		logger.warn(`PID => ${WORKER.process.pid} will die at:${Date()}`);
		cluster.fork();
	});
} else {
	httpServer.listen(PORT, () => {
		logger.info(`Server runnign on port:${PORT} => PID WORKER:${process.pid}`);
		//mongoConnection(PersistenceType.Mongo);
		ioService.init(httpServer);
		//mysql_service.init();
	});
}
