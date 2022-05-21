import dotenv from 'dotenv';

dotenv.config();

const config = {
	server_port: process.env.SERVER_PORT || 3000,
};

export default config;
