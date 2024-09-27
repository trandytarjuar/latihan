import { Request, Response, Router } from 'express';
import authRoute from './authRoute';
import noteRoute from './noteRoute';

const v1Router = Router();

v1Router.use('/auth', authRoute);
v1Router.use('/note', noteRoute);

export default v1Router;
