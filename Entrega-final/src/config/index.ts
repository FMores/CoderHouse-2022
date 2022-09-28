import dotenv from 'dotenv';

dotenv.config();

const config = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL || 'mongodb://localhost:27017/<db_name>',
    MONGODB_ATLAS_SRV: process.env.MONGODB_ATLAS_SRV || 'mongo_atlas_srv',
    COOKIE_PARSER_SECRET: process.env.COOKIE_PARSER_SECRET || 'default-cookie-secret',
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || 'default-session-secret',
    GMAIL_OWNER_ADRESS: process.env.GMAIL_OWNER_ADRESS || 'admin@gmail.com',
    GMAIL_OWNER_NAME: process.env.GMAIL_OWNER_NAME || 'admin api',
    GMAIL_OWNER_PASSWORD: process.env.GMAIL_OWNER_PASSWORD || 'asfasnfl23l4k2j34lk',
};

export default config;
