import config from './config';
import app_compression from './services/server.compression';
import app from './services/server';

const server = app.listen(config.SERVER_PORT, () => {
	console.log(`Common server running on port:${config.SERVER_PORT}`);
});

const server_compression = app_compression.listen(8081, () => {
	console.log(`Server with compression running on port:8081`);
});
