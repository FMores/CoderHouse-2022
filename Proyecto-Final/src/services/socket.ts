import io, { Server as ioServer } from 'socket.io';
import { Server as httpServer } from 'http';
//import { messagesController } from '../controllers/messages';
//import { productController } from '../controllers/products';

//Datos utiles

//Para responder a un solo cliente => socket.emit('peticion', respuesta)
//Para responder a todos => this.ioServer.emit('peticion', respuesta)
//Para responder a todos menos al que envia el mensaje => socket.broadcast.emit('peticion', respuesta)

class IoService {
	private ioServer: ioServer | undefined;

	init = (httpServer: httpServer) => {
		console.log('Iniciando conexión socket');
		if (this.ioServer) {
			console.log('Una conexión socket ya se encuentra establecida.');
		} else {
			this.ioServer = new io.Server(httpServer);

			this.ioServer.on('connection', async (socket) => {
				// // Chat-Room
				// socket.emit('mensajes', await messagesController.getAll());
				// socket.on('new-msg', async (data) => {
				// 	await messagesController.save(data);
				// 	this.ioServer?.emit('mensajes', await messagesController.getAll());
				// });
				// // Produc List
				// socket.emit('product-list', await productController.getAll());
				// socket.on('new_product', async (data) => {
				// 	await productController.save(data);
				// 	this.ioServer?.emit('product-list', await productController.getAll());
				// });
			});
		}
	};
}

export const ioService = new IoService();
