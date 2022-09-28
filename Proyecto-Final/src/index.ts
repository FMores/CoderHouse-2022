import { mongoDBConnection } from './services/mongodb.service';
import { logger } from './utils/winston.logger';
import { httpServer } from './services/server';
import { SocketService } from './services/socket';
import config from './config';

mongoDBConnection(config.MONGODB_MODE).then(() => {
	SocketService.init(httpServer);
	httpServer.listen(config.SERVER_PORT, () => {
		logger.info(`Server running on port => ${config.SERVER_PORT}`);
	});
});
