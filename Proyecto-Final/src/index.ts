import { httpServer } from './services/server';
import { ioService } from './services/socket';
import config from './config';

//Iniciar server utilizando el modulo Http y socket
httpServer.listen(config.server_port, () => {
	console.log(`Server running on port:${config.server_port}`);
	ioService.init(httpServer);
});
