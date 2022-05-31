import { PersistenceType } from '../DAO/interfaces';
import mongoose from 'mongoose';
import config from '../config/indexConfig';

export const mongoConnection = async (type: PersistenceType) => {
	try {
		if (type === 'Mongo') {
			const mongoDbLocal = await mongoose.connect(config.MONGO_LOCAL_URI);
			console.log('Successful connection to local mongo database');
			return mongoDbLocal;
		} else {
			const mongoAtlas = await mongoose.connect(config.MONGO_ATLAS_URI);
			console.log('Successful connection to mongo atlas database');
			return mongoAtlas;
		}
	} catch (err: any) {
		throw new Error(`Cannot connect to the database because: ${err.message}`);
	}
};
