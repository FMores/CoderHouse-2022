import fs from 'fs/promises';
import path from 'path';

const dataPath = path.resolve(__dirname, './data.txt');

(async () => {
	await fs.appendFile(dataPath, 'nuevo dato\t');
	const data = await fs.readFile(dataPath, 'utf-8');
	console.log(data);
})();
