import { mongoConnection } from './services/Mongo.Service';
import { mysql_service } from './services/MySQL.Service';
import { ioService } from './services/Socket.Service';
import { app, httpServer } from './services/server';
import { PersistenceType } from './DAO/interfaces';
import config from './config';

//Iniciar server de forma clasica con Express.
// const server = app.listen(config.server_port, () => {
// 	console.log(`Server running on port:${config.server_port}`);
// });

//Iniciar server utilizando el modulo Http y socket
httpServer.listen(config.SERVER_PORT, () => {
	console.log(`Server running on port:${config.SERVER_PORT}`);
	//mongoConnection(PersistenceType.Mongo);
	ioService.init(httpServer);
	mysql_service.init();
});

//asdfas
