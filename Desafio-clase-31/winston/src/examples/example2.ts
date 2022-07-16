import { createLogger, transports } from 'winston';

export const ejemplo2 = () => {
	const logConfig = {
		level: 'info',
		transports: [
			new transports.Console({ level: 'verbose' }),
			new transports.File({ filename: './src//logs/example2.log', level: 'error' }),
			new transports.File({ filename: './src/logs/example3.log' }),
		],
	};

	const logger = createLogger(logConfig);

	//Niveles de logs
	logger.silly('Winston silli');
	logger.debug('Winston debug');
	logger.verbose('Winston verbose');
	logger.info('Winston info');
	logger.warn('Winston warn');
	logger.error('Winston error');
};
