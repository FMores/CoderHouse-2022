import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*---------------------------- GENERICO 1 ----------------------------*/

//const phrase = 'Hola mundo como estas?';

// app.get('/api/frase', (req: Request, res: Response) => {
// 	res.status(200).send({ data: phrase });
// });

// app.get('/api/letra/:num', (req: Request, res: Response) => {
// 	const index = Number(req.params.num);
// 	const phraseLength = phrase.length - 1;

// 	if (typeof index !== 'number' || index < 0 || index > phraseLength) {
// 		res.status(404).send({
// 			error: `El valor ingresado debe ser tipo numerico, mayor o iugal a cero y menor o igual que ${phraseLength}`,
// 		});
// 	} else {
// 		const letter = phrase[index];
// 		res.status(200).send({ letra: letter });
// 	}
// });

// app.get('/api/palabra/:num', (req: Request, res: Response) => {
// 	const index = Number(req.params.num);
// 	const arrPhrase = phrase.split(' ');
// 	const phraseLength = arrPhrase.length - 1;

// 	if (typeof index !== 'number' || index < 0 || index > phraseLength) {
// 		res.status(404).send({
// 			error: `El valor ingresado debe ser tipo numerico, mayor o iugal a cero y menor o igual que ${phraseLength}`,
// 		});
// 	} else {
// 		const searchedWord = arrPhrase[index];
// 		res.status(200).send({ letra: searchedWord });
// 	}
// });

/*---------------------------- GENERICO 2 ----------------------------*/

// app.get('/api/sumar/:val1/:val2', (req: Request, res: Response) => {
// 	const { val1, val2 } = req.params;
// 	res.status(200).send({ val1: val1, val2: val2 });
// });

// app.get('/api/sumar', (req: Request, res: Response) => {
// 	const { val1, val2 } = req.query;
// 	res.status(200).send({ val1: val1, val2: val2 });
// });

// app.get('/api/operacion/:op', (req: Request, res: Response) => {
// 	const { op } = req.params;
// 	res.status(200).send({ result: eval(op) });
// });

/*---------------------------- GENERICO 3 ----------------------------*/

// let phrase2 = 'Frase inicial para coderhouse';

// app.get('/api/frase', (req: Request, res: Response) => {
// 	res.status(200).send({ frase: phrase2 });
// });

// app.get('/api/palabra/:pos', (req: Request, res: Response) => {
// 	const index = Number(req.params.pos);
// 	const arrPhrase = phrase2.split(' ');

// 	if (typeof index !== 'number' || index <= 0 || index > arrPhrase.length) {
// 		res.status(404).send({
// 			error: `El valor ingresado debe ser tipo numerico, mayor o iugal a 1 y menor o igual que ${arrPhrase.length}`,
// 		});
// 	} else {
// 		const searchedWord = arrPhrase[index - 1];
// 		res.status(200).send({ posición: index, palabra_encontrada: searchedWord });
// 	}
// });

// app.post('/api/palabra', (req: Request, res: Response) => {
// 	const newWord = req.body;
// 	const arrPhrase2 = phrase2.split(' ');
// 	const newWordPosition = arrPhrase2.length + 1;
// 	phrase2 = `${phrase2} ${newWord.nueva_palabra}`;
// 	res.status(200).send({
// 		parabra_agregada: newWord.nueva_palabra,
// 		posición: newWordPosition,
// 		frase_actualizada: phrase2,
// 	});
// });

// app.put('/api/palabra/:pos', (req: Request, res: Response) => {
// 	const index = Number(req.params.pos);
// 	const { nueva_palabra } = req.body;
// 	const arrPhrase2 = phrase2.split(' ');
// 	const wordToReplace = arrPhrase2[index - 1];

// 	if (typeof index !== 'number' || index <= 0 || index > arrPhrase2.length) {
// 		res.status(404).send({
// 			error: `El valor ingresado debe ser tipo numerico, mayor o iugal a 1 y menor o igual que ${arrPhrase2.length}`,
// 		});
// 	} else {
// 		phrase2 = phrase2.replace(wordToReplace, nueva_palabra);
// 		res.status(200).send({ palabra_anterior: wordToReplace, nueva_palabra: nueva_palabra });
// 	}
// });

// app.delete('/api/palabra/:pos', (req: Request, res: Response) => {
// 	const index = Number(req.params.pos);
// 	const arrPhrase2 = phrase2.split(' ');

// 	if (typeof index !== 'number' || index <= 0 || index > arrPhrase2.length) {
// 		res.status(404).send({
// 			error: `El valor ingresado debe ser tipo numerico, mayor o iugal a 1 y menor o igual que ${arrPhrase2.length}`,
// 		});
// 	} else {
// 		const deletedWordArr = arrPhrase2.splice(index - 1, 1);
// 		const deletedWordStr = deletedWordArr.join(' ');
// 		phrase2 = arrPhrase2.join(' ');
// 		res
// 			.status(200)
// 			.send({ palabra_eliminada: deletedWordStr, posición: index, frase_actualizada: phrase2 });
// 	}
// });

/*----------------------------- SERVER -------------------------------*/

const server_port = 8080;

const server = app.listen(server_port, () => {
	console.log(`Server running on port ${server_port}`);
});

server.on('error', (err) => {
	console.log(`Something went wrong: ${err}`);
});
