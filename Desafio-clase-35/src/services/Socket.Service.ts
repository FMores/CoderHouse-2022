import { product_Controller } from '../controllers/product.controller';
import { msgController } from '../controllers/msg.controller';
import io, { Server as ioServer } from 'socket.io';
import { logger } from '../utils/winston.logger';
import { Server as httpServer } from 'http';

//Datos utiles
//Para responder a un solo cliente => socket.emit('peticion', respuesta)
//Para responder a todos => this.ioServer.emit('peticion', respuesta)
//Para responder a todos menos al que envia el mensaje => socket.broadcast.emit('peticion', respuesta)

class IoService {
	public ioServer: ioServer | undefined;

	init = (httpServer: httpServer) => {
		logger.info('Iniciando conexión socket');

		if (this.ioServer) {
			logger.info('Una conexión socket ya se encuentra establecida.');
		} else {
			this.ioServer = new io.Server(httpServer);

			this.ioServer.on('connection', async (socket) => {
				// Chat-Room
				socket.emit('mensajes', await msgController.get());

				socket.on('new-msg', async (data) => {
					await msgController.add(data);

					this.ioServer?.emit('mensajes', await msgController.get());
				});

				//Produc List
				socket.emit('product-list', await product_Controller.get());

				socket.on('new_product', async (data) => {
					await product_Controller.add(data);

					this.ioServer?.emit('product-list', await product_Controller.get());
				});
			});
		}
	};
}

export const ioService = new IoService();
