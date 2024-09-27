import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/responseFormatter';
import httpStatus from 'http-status';

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  sendErrorResponse(res, httpStatus.NOT_FOUND, 'Resource Not Found', null);
};

export default notFoundMiddleware;
