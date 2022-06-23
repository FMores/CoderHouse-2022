import { app, httpServer } from './services/server';
import config from './config';
import { mysql_service } from './services/MySQL.Service';
import { ioService } from './services/Socket.Service';

//Iniciar server de forma clasica con Express.
// const server = app.listen(config.server_port, () => {
// 	console.log(`Server running on port:${config.server_port}`);
// });

//Iniciar server utilizando el modulo Http y socket
httpServer.listen(config.SERVER_PORT, () => {
	console.log(`Server running on port:${config.SERVER_PORT}`);
	ioService.init(httpServer);
	mysql_service.init();
});
