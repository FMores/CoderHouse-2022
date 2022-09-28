import { Document } from 'mongoose';
import { IProduct } from '../products/product.interfaces';

export interface ICart extends Document {
	user: string;
	items: [IProduct];
}

export interface INewCart {
	user: string;
}
