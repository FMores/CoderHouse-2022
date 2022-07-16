import { createLogger, transports } from 'winston';

export const ejemplo1 = () => {
	const logConfig = {
		transports: [new transports.Console()],
	};

	const logger = createLogger(logConfig);

	logger.level = 'debug';

	//Niveles de logs
	logger.silly('Winston silli');
	logger.debug('Winston debug');
	logger.verbose('Winston verbose');
	logger.info('Winston info');
	logger.warn('Winston warn');
	logger.error('Winston error');
};
