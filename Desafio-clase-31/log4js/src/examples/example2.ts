import { getLogger, configure } from 'log4js';

/* 

Appenders

En Log4J los mensajes son enviados a una (o varias) salida de destino, lo que se denomina
un appender. Existen varios appenders y también podemos crear propios. Típicamente la salida 
de los mensajes es redirigida a un fichero de texto .log (FileAppender, RollingFileAppender), 
a un servidor remoto donde almacenar registros (SocketAppender), a una dirección de correo 
electrónico (SMTPAppender), e incluso en una base de datos (JDBCAppender). Casi nunca es utilizado
en un entorno de producción la salida a la consola (ConsoleAppender) ya que perdería gran parte de la utilidad de Log4J.

*/

export const ejemplo2 = () => {
	configure({
		appenders: {
			fileAppender: { type: 'file', filename: './src/logs/example2.log' },
			console: { type: 'console' },
		},

		/* Tambien podemos decirle a cada categoria que utilice mas de un appender a lavez ej: ['fileAppender', 'console'] */
		categories: {
			default: { appenders: ['fileAppender'], level: 'error' },
			customLogger: { appenders: ['console'], level: 'error' },
		},
	});

	/* Si no le pasamos una categoria a la funcion, toma por defecto default (linea 23). */
	const logger1 = getLogger();
	const logger2 = getLogger('customLogger');

	/* Si utilizo la linea 31, sobreescrivo el valor de level seteados en los appenders */
	// logger1.level = 'error'

	// Mensajes de log para logger1
	logger1.trace('logger trace');
	logger1.debug('logger debug');
	logger1.info('logger info');
	logger1.warn('logger warm');
	logger1.error('logger error');
	logger1.fatal('logger fatal');

	// Mensajes de log para logger2
	logger2.trace('logger trace');
	logger2.debug('logger debug');
	logger2.info('logger info');
	logger2.warn('logger warm');
	logger2.error('logger error');
	logger2.fatal('logger fatal');

	/* 
    La desventaja de log$js es que no podemos utilizar mas de una categoria (linea 22) por logger.
    Si no que tenemos que crear una nueva llamada a getLogger() con la categoria deseada generando codigo duplicado.
    */
};
