import dotenv from 'dotenv';

dotenv.config();

const config = {
	SERVER_PORT: process.env.SERVER_PORT || 3000,
	MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI || 'your_local_uri',
	MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI || 'your_mongo_atlas_uri',
	FIREBASE_ACCOUNT_CONFIG: process.env.FIREBASE_ACCOUNT_CONFIG || 'your_FIREBASE_ACCOUNT_CONFIG',
};

export default config;
