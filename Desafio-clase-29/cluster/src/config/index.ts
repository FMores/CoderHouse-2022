import dotenv from 'dotenv';

dotenv.config();

export const config = {
	SERVER_PORT: process.env.SERVER_PORT || 3000,
};
