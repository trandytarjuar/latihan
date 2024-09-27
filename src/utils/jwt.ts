import Jwt from 'jsonwebtoken';
import config from '../config/vars';
import { Schema } from 'mongoose';

const keySecret = config.jwt.secret;
// const keySecret = process.env.JWT_SECRET || 'default-secret-key';
const expiretoken = config.jwt.expire;
// const expiretoken = process.env.JWT_EXPIRATION || '1d';

const tokenRefresh = config.jwt.refreshExpire;

export const generateToken = (nip: string) => {
  return Jwt.sign({ nip }, keySecret, { expiresIn: expiretoken });
};

export const generateTokenCms = (
  name: string,
  role: string,
  tenant_id: { type: Schema.Types.ObjectId },
) => {
  const payload = {
    name: name,
    role: role,
    tenant_id: tenant_id,
  };

  return Jwt.sign(payload, keySecret, { expiresIn: expiretoken });
};

export const verifyToken = (token: string) => {
  try {
    return Jwt.verify(token, keySecret);
  } catch (error) {
    return null;
  }
};

export const refreshToken = (nip: string) => {
  return Jwt.sign({ nip }, keySecret, { expiresIn: expiretoken });
};

export const verifyRefreshToken = (token: string) => {
  try {
    return Jwt.verify(token, tokenRefresh);
  } catch (error) {
    return null;
  }
};
