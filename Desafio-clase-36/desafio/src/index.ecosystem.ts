//import { mongoConnection } from './services/Mongo.Service';
//import { mysql_service } from './services/MySQL.Service';
//import { PersistenceType } from './DAO/interfaces';
//import { ioService } from './services/Socket.Service';
import { httpServer } from './services/server';
import config, { yargs } from './config';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

console.log('ecosystem:', yargs);

httpServer.listen(config.SERVER_PORT, () => {
	console.log(`Server runnign on port:${config.SERVER_PORT} => PID WORKER:${process.pid}`);
	//mongoConnection(PersistenceType.Mongo);
	//ioService.init(httpServer);
	//mysql_service.init();
});
