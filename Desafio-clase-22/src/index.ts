import { app, httpServer } from './services/server';
import config from './config';
import { ioService } from './services/socket';
import { mysql_service } from './services/Mysql';
import { sqLite_service } from './services/sqlite3';

//Iniciar server de forma clasica con Express.
// const server = app.listen(config.server_port, () => {
// 	console.log(`Server running on port:${config.server_port}`);
// });

//Iniciar server utilizando el modulo Http y socket
httpServer.listen(config.server_port, () => {
	console.log(`Server running on port:${config.server_port}`);
	ioService.init(httpServer);
	mysql_service.init();
	sqLite_service.init();
});
