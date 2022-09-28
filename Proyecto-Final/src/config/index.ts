import dotenv from 'dotenv';
const { hideBin } = require('yargs/helpers');
export const yargs = require('yargs/yargs')(hideBin(process.argv)).argv;

dotenv.config();

export default {
	/* SERVER AND DATABASE */
	SERVER_PORT: yargs.SERVER_PORT || process.env.SERVER_PORT,
	MONGODB_MODE: yargs.MONGODB_MODE || process.env.MONGODB_MODE,
	MONGODB_LOCAL_URL: yargs.MONGODB_LOCAL_URL || process.env.MONGODB_LOCAL_URL,
	MONGODB_ATLAS_SRV: yargs.MONGODB_ATLAS_SRV || process.env.MONGODB_ATLAS_SRV,

	/* SESSION CONFIG */
	EXPRESS_SESSION_SECRET: yargs.EXPRESS_SESSION_SECRET || process.env.EXPRESS_SESSION_SECRET,
	COOKIE_PARSER_SECRET: yargs.COOKIE_PARSER_SECRET || process.env.COOKIE_PARSER_SECRET,
	COOKIE_EXPIRES_TIME: yargs.COOKIE_EXPIRES_TIME || process.env.COOKIE_EXPIRES_TIME,

	/* MAILING */
	GMAIL_OWNER_ADRESS: yargs.GMAIL_OWNER_ADRESS || process.env.GMAIL_OWNER_ADRESS,
	GMAIL_OWNER_PASSWORD: yargs.GMAIL_OWNER_PASSWORD || process.env.GMAIL_OWNER_PASSWORD,
	GMAIL_OWNER_NAME: yargs.GMAIL_OWNER_NAME || process.env.GMAIL_OWNER_NAME,
};
