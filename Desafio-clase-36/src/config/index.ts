import dotenv from 'dotenv';
const { hideBin } = require('yargs/helpers');
export const yargs = require('yargs/yargs')(hideBin(process.argv)).argv;

dotenv.config();

const config = {
	SERVER_MODE: yargs.server_mode || 'Fork',
	SERVER_PORT: yargs.server_port || process.env.SERVER_PORT || 3000,
	MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI || 'your_local_uri',
	MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI || 'your_mongo_atlas_uri',
	FIREBASE_ACCOUNT_CONFIG: process.env.FIREBASE_ACCOUNT_CONFIG || 'your_FIREBASE_ACCOUNT_CONFIG',
	EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || 'your express-session_secret',
	COOKIE_PARSER_SECRET: process.env.COOKIE_PARSER_SECRET || 'your cookie-parser_secret',
	ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'email@ethereal.email',
	ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'password',
	ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'ethereal owner name',
	GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'tuemail@gmail.com',
	GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'gmail_password',
	GMAIL_NAME: process.env.GMAIL_NAME || 'gmail owner name',
	TWILIO_SID: process.env.TWILIO_SID || 'twilio_sid',
	TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilio_token',
	TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || 'phone_number',
};

export default config;
