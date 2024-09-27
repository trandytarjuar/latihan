// import { required } from "joi";
import mongoose, { Schema } from 'mongoose';
import { Iusers } from '../interfaces/Iusers';

const userSchema = new Schema<Iusers>({
  nama: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [
    {
      token: { type: String, required: false },
      expired_at: { type: Date, required: false },
    },
  ],
});

const UserModel = mongoose.model<Iusers>('Users', userSchema);

export default UserModel;
