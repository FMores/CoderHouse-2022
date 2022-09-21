import dotenv from 'dotenv';

dotenv.config();

const config = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL || 'mongodb://localhost:27017/<db_name>',
    MONGODB_ATLAS_SRV: process.env.MONGODB_ATLAS_SRV || 'mongo_atlas_srv',
};

export default config;
