import multer from 'multer';
import path from 'path';

const imagesFolderPath = path.resolve(__dirname, '../../images');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, imagesFolderPath);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

export = multer({ storage: storage });
