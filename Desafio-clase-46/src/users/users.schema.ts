import { Schema, Document } from 'mongoose';
import { CreateUserDTO } from './users.dto';

export const UserSchema = new Schema<CreateUserDTO>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface User extends Document {
  _id: string;
  username: string;
  password: string;
}
