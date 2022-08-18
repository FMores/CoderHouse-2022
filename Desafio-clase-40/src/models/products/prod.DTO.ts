import { IProduct } from './prod.interfaces';

export class ProductDTO {
	private id?: number;
	private title: string;
	private price: number;
	private timestamp?: string;
	private thumbnail: string;

	constructor(prod: IProduct) {
		(this.id = prod._id),
			(this.title = prod.title),
			(this.price = prod.price),
			(this.thumbnail = prod.thumbnail),
			(this.timestamp = prod.timestamp);
	}
}
