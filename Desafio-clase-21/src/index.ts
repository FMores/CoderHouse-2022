export class Calculadora {
	static suma(num1: any, num2: any) {
		if (isNaN(num1) || isNaN(num2)) {
			throw Error('Syntax Error');
		}
		return num1 + num2;
	}
}
