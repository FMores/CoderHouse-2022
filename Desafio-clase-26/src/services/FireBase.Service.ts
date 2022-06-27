import Config from '../config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const fireBaseConnection = () => {
	initializeApp({
		credential: cert(Config.FIREBASE_ACCOUNT_CONFIG),
	});

	const db = getFirestore();

	console.log('Successful connection to FireBase database');

	return db;
};
