import io, { Server as ioServer } from 'socket.io';
import { Server as httpServer } from 'http';
import { msgController } from '../controllers/msg.controller';
import { productController } from '../controllers/product.controller';

//Datos utiles

//Para responder a un solo cliente => socket.emit('peticion', respuesta)
//Para responder a todos => this.ioServer.emit('peticion', respuesta)
//Para responder a todos menos al que envia el mensaje => socket.broadcast.emit('peticion', respuesta)

class IoService {
	public ioServer: ioServer | undefined;

	init = (httpServer: httpServer) => {
		console.log('Iniciando conexión socket');
		if (this.ioServer) {
			console.log('Una conexión socket ya se encuentra establecida.');
		} else {
			this.ioServer = new io.Server(httpServer);

			this.ioServer.on('connection', async (socket) => {
				// Chat-Room
				socket.emit('mensajes', await msgController.get());
				socket.on('new-msg', async (data) => {
					await msgController.save(data);
					this.ioServer?.emit('mensajes', await msgController.get());
				});

				// Produc List
				socket.emit('product-list', await productController.getAll());
				socket.on('new_product', async (data) => {
					await productController.save(data);
					this.ioServer?.emit('product-list', await productController.getAll());
				});

				// Produc List from faker
				socket.emit('fake-product-list', await productController.getFakeData());
			});
		}
	};
}

export const ioService = new IoService();
