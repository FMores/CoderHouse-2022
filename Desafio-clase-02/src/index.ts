interface Book {
	author: string;
	title: string;
}

class Users {
	constructor(private name: string, private lastName: string) {}

	private arrPets: string[] = ['Horse', 'cat', 'dog', 'bird', 'snake'];

	private arrBooks: Book[] = [
		{ author: 'Michael Bay', title: 'Bad Boys' },
		{ author: 'Peter Jackson', title: 'Ther Lord Of The Rings' },
	];

	public getFullName(): string {
		return `Mi name is ${this.name}, ${this.lastName}`;
	}

	public addPet(newPet: string): void {
		this.arrPets.push(newPet);
	}

	public petCounter(): number {
		return this.arrPets.length;
	}

	public addBook(newBook: Book): void {
		this.arrBooks.push(newBook);
	}

	public getBookTitles(): string[] {
		const arrOfBookTitles: string[] = [];
		for (let el of this.arrBooks) {
			arrOfBookTitles.push(Object.values(el)[1]);
		}
		return arrOfBookTitles;
	}
}

// const userOne = new Users('Fabricio', 'Mores');

// const fullName = userOne.getFullName();
// console.log(fullName);

// userOne.addPet('pig');

// const numberOfPets = userOne.petCounter();
// console.log(`Tengo ${numberOfPets} animales`);

// userOne.addBook({ author: 'Christoper Nolan', title: 'Interestellar' });

// const bookTitles = userOne.getBookTitles();
// console.log('Titulos de libros almacenados:', bookTitles);

//
