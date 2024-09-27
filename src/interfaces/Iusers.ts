import { Schema, Document, Date } from 'mongoose';

// export interface IToken {
//   token: string;
//   expired_at: Date;
// }

export interface Iusers extends Document {
  nama: string;
  email: string;
  password: string;
  tokens: { token: string; expired_at: Date }[];
}
