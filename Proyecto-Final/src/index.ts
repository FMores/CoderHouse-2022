import { httpServer } from './services/server';
import { ioService } from './services/socket';
import config from './config/indexConfig';

//Iniciar server utilizando el modulo Http y socket
httpServer.listen(config.SERVER_PORT, () => {
	console.log(`Server running on port:${config.SERVER_PORT}`);
	ioService.init(httpServer);
});
