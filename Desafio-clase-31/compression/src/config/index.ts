import dotenv from 'dotenv';

dotenv.config();

const config = {
	SERVER_PORT: process.env.SERVER_PORT || 3000,
};

export default config;
