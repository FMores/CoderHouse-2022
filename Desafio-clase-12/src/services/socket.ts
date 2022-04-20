import io, { Server as ioServer } from 'socket.io';
import { Server as httpServer } from 'http';

// Con esta clase iniciamos la conexion de socket.
// Con la funcion init evitamos que se creen dos instancias o conexiones de socket.

class IoService {
	private ioServer: ioServer | undefined;

	init = (httpServer: httpServer) => {
		console.log('Iniciando conexión socket');
		if (this.ioServer) {
			console.log('Una conexión socket ya se encuentra establecida.');
		} else {
			this.ioServer = new io.Server(httpServer);

			this.ioServer.on('connection', (socket) => {
				console.log('se conecto un nuevo cliente');
			});
		}
	};
}

export const ioService = new IoService();
