import { app } from './services/server';
import indexRouter from './routes';
import { config } from './config';

const server = app;

app.use('/api', indexRouter);

server.listen(config.SERVER_PORT, () => {
	console.log(`Server runnign on port:${config.SERVER_PORT} => PID WORKER:${process.pid}`);
});
