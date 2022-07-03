import dotenv from 'dotenv';

dotenv.config();

const config = {
	SERVER_PORT: process.env.SERVER_PORT || 3000,
	MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI || 'your_local_uri',
	MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI || 'your_mongo_atlas_uri',
	FIREBASE_ACCOUNT_CONFIG: process.env.FIREBASE_ACCOUNT_CONFIG || 'your_FIREBASE_ACCOUNT_CONFIG',
	EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || 'your express-session_secret',
	COOKIE_PARSER_SECRET: process.env.COOKIE_PARSER_SECRET || 'your cookie-parser_secret',
};

export default config;
