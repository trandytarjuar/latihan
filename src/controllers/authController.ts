import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as authServices from '../services/authServices';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseFormatter';

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing their name, email, and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - email
 *               - password
 *             properties:
 *               nama:
 *                 type: string
 *                 example: trandy1
 *               email:
 *                 type: string
 *                 example: tes12@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Register Succes
 *                 data:
 *                   type: object
 *                   properties:
 *                     nama:
 *                       type: string
 *                       example: trandy1
 *                     email:
 *                       type: string
 *                       example: tes12@gmail.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$Det4XRZmzN0.qixSXwj1/upgZbgA4gbuKlHtvXbgANVe9ZwHFKPv.
 *                     _id:
 *                       type: string
 *                       example: 66f27d47f4eb9e4cb2d4879e
 *                     tokens:
 *                       type: array
 *                       items:
 *                         type: string
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       500:
 *         description: Internal Server Error
 */

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { nama, email, password } = req.body;

    const constRegist = await authServices.RegisterUser(nama, email, password);
    sendSuccessResponse(res, httpStatus.OK, constRegist, 'Register Succes');
  } catch (error) {
    console.error('Error saving user:', error);
    sendErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'Register Failed');
  }
};

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user by their email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: tes12@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *                 error:
 *                   type: string
 *                   example: null
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const constLogin = await authServices.loginUser(email, password);

    if (constLogin) {
      sendSuccessResponse(res, httpStatus.OK, constLogin, 'Login successful');
    } else {
      sendErrorResponse(res, httpStatus.UNAUTHORIZED, 'Invalid email or password');
    }
  } catch (error) {
    sendErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'Login failed');
  }
};
