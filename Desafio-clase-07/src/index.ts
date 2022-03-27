import express from 'express';
import operation from './controller';

const app = express();

app.get('/productos', operation.getAll);

app.get('/producto-random', operation.getRandom);

const server_port = 8080;

const server = app.listen(server_port, () => {
	console.log(`Server running on port ${server_port}`);
});

server.on('error', (err) => {
	console.log(`Something went wrong: ${err}`);
});
