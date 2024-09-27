import { generateToken } from '../utils/jwt';
import { Iusers } from '../interfaces/Iusers';
import UserModel from '../models/userModels';
import bcrypt from 'bcrypt';

export const RegisterUser = async (
  nama: string,
  email: string,
  password: string,
): Promise<Iusers | null> => {
  console.log('cek email', email);
  const cekEmail = await UserModel.findOne({ email });
  console.log(cekEmail, 'emailll');

  if (cekEmail) {
    throw new Error('email is registered');
  }
  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buat pengguna baru
  const newUser = new UserModel({
    nama,
    email,
    password: hashedPassword, // simpan password yang sudah di-hash
  });
  console.log(newUser, 'save');
  // Simpan pengguna baru ke database
  const savedUser = await newUser.save();
  console.log(savedUser, 'key shddsj save');

  return savedUser;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string } | null> => {
  try {
    // Find user by email
    const user: Iusers | null = await UserModel.findOne({ email });
    if (!user) {
      return null; // User not found
    }

    // Compare provided password with the hashed password stored in the database
    const checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass) {
      return null; // Invalid password
    }

    const currentTime = new Date();
    let validAccessToken: string | null = null;

    // Filter expired tokens and find the valid access token if exists
    const validTokens = user.tokens.filter((tokenObj: any) => {
      if (new Date(tokenObj.expired_at) > currentTime) {
        if (tokenObj.tokenType === 'access') {
          validAccessToken = tokenObj.token;
        }
        return true; // Keep valid tokens
      }
      return false; // Remove expired tokens
    });

    let newAccessToken: string;
    if (!validAccessToken) {
      newAccessToken = generateToken(user.email);
    } else {
      newAccessToken = validAccessToken;
    }

    const updatedTokens: any = [...validTokens];

    if (newAccessToken !== validAccessToken) {
      updatedTokens.push({
        token: newAccessToken,
        expired_at: new Date(currentTime.getTime() + 24 * 60 * 60 * 1000), // Correct Date usage
      });
    }

    // Update user tokens in the database only if there are changes
    if (updatedTokens.length !== user.tokens.length) {
      await UserModel.updateOne({ _id: user._id }, { tokens: updatedTokens });
    }

    // Return the new access token
    return { token: newAccessToken };
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};
