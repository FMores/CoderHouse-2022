import { Schema } from 'mongoose';
import { ProductDTO } from './product.dto';

export const ProductSchema = new Schema<ProductDTO>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
