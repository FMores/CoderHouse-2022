import { Calculadora } from '../index';

// Pagina guia para configurar Jest con Typescript!!
// https://www.adictosaltrabajo.com/2020/01/17/instalacion-de-jest-con-typescript-y-ms-visual-studio-code/
// https://jestjs.io/docs/getting-started

// El string es el titulo que describe todos los test que van a estar dentro de esta funcion.
describe('Mi conjunto de test para calculadora', () => {
	//Para comenzar a definir un test, utilizamos "it". Lo primero que se introduce es una descripcion de lo que se va a testear.
	it('Deberia realizar la suma de dos numeros enteros', () => {
		expect(Calculadora.suma(4, 4)).toBe(8);
	});

	it('Los dos argumentos deberian ser de tipo numericos', () => {
		expect(Calculadora.suma(4, { name: 'Fabri' }).toThrow('Syntax Error: los dos numeros deben ser de tipo number'));
	});
});
