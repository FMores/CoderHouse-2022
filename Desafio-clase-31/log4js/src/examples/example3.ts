import { getLogger, configure } from 'log4js';

/* 
Logger aplicando filtros:

En este caso estamos indicando que todos los errores de tipo 'error' y 'fatal' se guarden en un file.
A su vez, todos los logger de 'debug' hacia arriba se van a mostrar por consola' incluidos 'error' y 'fatal'.

*/

export const ejemplo3 = () => {
	configure({
		appenders: {
			everything: { type: 'file', filename: './src/logs/example3.log' },
			console: { type: 'console' },
			justErrors: { type: 'logLevelFilter', appender: 'everything', level: 'debug' },
		},
		categories: {
			default: { appenders: ['justErrors', 'console'], level: 'error' },
		},
	});

	const logger = getLogger();

	// Mensajes de log para logger1
	logger.trace('logger trace');
	logger.debug('logger debug');
	logger.info('logger info');
	logger.warn('logger warm');
	logger.error('logger error');
	logger.fatal('logger fatal');
};
