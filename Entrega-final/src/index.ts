import config from './config/index';
import { httpServer } from './services/server';
import { logger } from './utils/winston.logger';

httpServer.listen(config.SERVER_PORT, () => {
    logger.info(`SERVER UP ON PORT ${config.SERVER_PORT}`);
});
