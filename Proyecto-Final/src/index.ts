import { httpServer } from './services/server';
import { ioService } from './services/socket';
import config from './config';
import { logger } from './utils/winston.logger';

//Iniciar server utilizando el modulo Http y socket
httpServer.listen(config.SERVER_PORT, () => {
	logger.info(`Server running on port:${config.SERVER_PORT}`);
	ioService.init(httpServer);
});
