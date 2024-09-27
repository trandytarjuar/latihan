import { Response } from 'express';

// Utility function for sending success responses
export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  data: any,
  message: string = 'Success',
) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    status: 'success',
    message,
    data,
  });
};

// Utility function for sending error responses
export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string = 'An error occurred',
  error: any = null,
) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    status: 'error',
    message,
    error,
  });
};

export const sendSuccessResponseWithFilter = (
  res: Response,
  statusCode: number,
  data: any,
  message: string = 'Success',
  total: number,
  page: number,
  limit: number,
  total_pages: number,
) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    status: 'success',
    message,
    pagination: {
      total,
      page,
      limit,
      total_pages,
    },
    data,
  });
};
