import { mongoDBConnection } from './services/mongodb.service';
import { logger } from './utils/winston.logger';
import { httpServer } from './services/server';
import { SocketService } from './services/socket';
import config from './config';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary && config.SERVER_MODE === 'CLUSTER') {
	logger.info(`Server in cluster mode => PID Master:${process.pid}`);

	for (let cpu = numCPUs; cpu < numCPUs; cpu++) {
		cluster.fork();
	}

	cluster.on('exit', (WORKER) => {
		logger.error(`Worker PID => ${WORKER.process.pid} will die at:${Date()}`);
		cluster.fork();
	});
} else {
	mongoDBConnection(config.MONGODB_MODE).then(() => {
		SocketService.init(httpServer);
		httpServer.listen(config.SERVER_PORT, () => {
			logger.info(`Server running on port => ${config.SERVER_PORT}`);
		});
	});
}
