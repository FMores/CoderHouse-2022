import { Schema } from 'mongoose';
import { MessageDTO } from './message.dto';

export const MessageSchema = new Schema<MessageDTO>(
  {
    author: {
      email: {
        type: String,
        trim: true,
        required: true,
        match: /.+\@.+\..+/,
      },
      name: { type: String, required: true, max: 50 },
      surname: { type: String, required: true, max: 50 },
      alias: { type: String, required: true, max: 50 },
      age: { type: Number, required: true },
      avatar: { type: String, required: true, max: 50 },
    },
    text: { type: String, required: true, max: 1000 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
