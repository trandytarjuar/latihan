import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Iusers } from '../interfaces/Iusers';

const secretKey = process.env.JWT_SECRET || 'your-very-secure-secret-key';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
// Middleware untuk otentikasi
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    // Verifikasi token dengan kunci rahasia JWT // Gantilah dengan kunci rahasia asli kamu
    const decoded = jwt.verify(token, secretKey) as Iusers;

    // Attach user information to the request object
    req.user = decoded;

    // Lanjutkan ke middleware atau route handler berikutnya
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

export default authMiddleware;
