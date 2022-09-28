export class ProductDTO {
	readonly id: string;
	readonly name: string;
	readonly description: string;
	readonly price: number;
	readonly photo: string;
	readonly category: string;
	readonly qty: number;

	constructor(data: any) {
		(this.id = data._id),
			(this.name = data.name),
			(this.description = data.description),
			(this.price = data.price),
			(this.photo = data.photo),
			(this.category = data.category),
			(this.qty = data.qty);
	}
}
