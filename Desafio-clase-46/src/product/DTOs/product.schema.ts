import { Schema } from 'mongoose';
import { ProductDTO } from './Product.dto';

export const ProductSchema = new Schema<ProductDTO>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
});
