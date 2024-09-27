import mongoose, { Schema } from 'mongoose';
import { Inotes } from '../interfaces/Inote';

const registerSchema = new Schema({
  userId: { type: String, required: true },
});

const noteSchema = new Schema<Inotes>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  register: [{ type: registerSchema }],
});

export const noteModels = mongoose.model<Inotes>('Note', noteSchema);

export default noteModels;
