import { app } from './services/server';
import config from './config';

const server = app.listen(config.server_port, () => {
	console.log(`Server running on port:${config.server_port}`);
});
