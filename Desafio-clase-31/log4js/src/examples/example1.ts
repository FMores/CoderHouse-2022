import { getLogger } from 'log4js';

/* CREANDO ESTRATEGIA DE LOGGER */

export const ejemplo1 = () => {
	// Este logger creado va a ser lo que utilicemos en ves que .log (console.log())
	const logger = getLogger();

	//Creamos nuestro nivel de logger a utilizar. Con esto estamos diciendo que solo se van a imprimir/guardar los logs de ese valor hacia arriba.
	logger.level = process.env.NODE_ENV !== 'prod' ? 'info' : 'error';

	//Debido a que el nivel elejido es warm, solo se van a imprimir/guardar los logs warm, error y fatal.

	//Niveles de logs
	logger.trace('logger trace');
	logger.debug('logger debug');
	logger.info('logger info');
	logger.warn('logger warm');
	logger.error('logger error');
	logger.fatal('logger fatal');
};

console.log(process.env.NODE_ENV);
