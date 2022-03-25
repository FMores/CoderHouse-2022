import moment from 'moment';

/*--------------------- GENERICO 1 ---------------------*/

const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomNumberList = {};

for (let i = 0; i < 100; i++) {
	const random = getRandomIntInclusive(1, 20);

	if (randomNumberList[random]) {
		randomNumberList[random]++;
	} else {
		randomNumberList[random] = 1;
	}
}

// console.log(randomNumberList);

/*--------------------- GENERICO 2 ---------------------*/

const productos = [
	{ id: 1, nombre: 'Escuadra', precio: 323.45 },
	{ id: 2, nombre: 'Calculadora', precio: 234.56 },
	{ id: 3, nombre: 'Globo Terráqueo', precio: 45.67 },
	{ id: 4, nombre: 'Paleta Pintura', precio: 456.78 },
	{ id: 5, nombre: 'Reloj', precio: 67.89 },
	{ id: 6, nombre: 'Agenda', precio: 78.9 },
];

const getName = () => {
	let producNames = null;
	for (const e of productos) {
		if (producNames === null) {
			producNames = e.nombre;
		} else {
			producNames = producNames.concat(', ', e.nombre);
		}
	}
	console.log('Resultado:', producNames);
};

//getName();

const totalPrice = () => {
	let total = 0;
	for (const e of productos) {
		total = total + e.precio;
	}
	console.log(total.toFixed(2));
};

//totalPrice();

const average = () => {
	let total = 0;
	for (const e of productos) {
		total = total + e.precio;
	}
	console.log((total / productos.length).toFixed(2));
};

//average();

const minPrice = () => {
	const min = productos.reduce((prev, current) => (prev.precio < current.precio ? prev : current));
	console.log('minPrice:', min.precio);
};

//minPrice();

const maxPrice = () => {
	const min = productos.reduce((prev, current) => (prev.precio > current.precio ? prev : current));
	console.log('maxPrice:', min.precio);
};

//maxPrice();

const result = productos.sort((a, b) => {
	return a.Cost - b.Cost;
});

//console.log('minPrice:', result[0].precio);
//console.log('maxPrice:', result[result.length - 1].precio);

/*--------------------- GENERICO 3 ---------------------*/

const miCumple = moment('10-11-1991', 'DD-MM-YYYY');
const now = moment();

//console.log('Hoy es', now.format('DD-MM-YYYY ===> dddd'));
//console.log('Naci el', miCumple.format('DD-MM-YYYY'));

const diferenciaDias = now.diff(miCumple, 'days');
const diferenciaAnios = now.diff(miCumple, 'years');

//console.log(`Desde mi nacimiento han pasado ${diferenciaAnios} años`);
//console.log(`Desde mi nacimiento han pasado ${diferenciaDias} dias`);
