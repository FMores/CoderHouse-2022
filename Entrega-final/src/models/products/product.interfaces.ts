import { Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    photo: string;
    category: string;
    qty: number;
}
