import { Schema, Document, ObjectId } from 'mongoose';

export interface register extends Document {
  userId: String;
}

export interface Inotes extends Document {
  id: ObjectId;
  title: String;
  content: String;
  register: register[];
}
