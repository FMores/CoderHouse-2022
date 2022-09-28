import io, { Server as WsServer } from 'socket.io';
import { Server as httpServer } from 'http';
import { logger } from '../utils/winston.logger';
import { productController } from '../controllers/products.controllers';
import { messageController } from '../controllers/message.controllers';

//Datos utiles

//Para responder a un solo cliente => socket.emit('peticion', respuesta)
//Para responder a todos => this.ioServer.emit('peticion', respuesta)
//Para responder a todos menos al que envia el mensaje => socket.broadcast.emit('peticion', respuesta)

class WsService {
	private ioServer: WsServer | undefined;

	init = (httpServer: httpServer) => {
		logger.info('Starting socket connection');

		if (this.ioServer) {
			logger.info('A socket connection is already established.');
		}

		this.ioServer = new WsServer(httpServer);

		this.ioServer.on('connection', async (socket) => {
			// Chat-Room
			socket.emit('mensajes', await messageController.get());
			socket.on('new-msg', async (data) => {
				await messageController.add(data);
				this.ioServer?.emit('mensajes', await messageController.get());
			});

			// Produc List
			// socket.emit('product-list', productController.get);
			// socket.on('new_product', async (data) => {
			// 	productController.post(data);
			// 	this.ioServer?.emit('product-list', productController.get);
			// });
		});
	};
}

export const SocketService = new WsService();
