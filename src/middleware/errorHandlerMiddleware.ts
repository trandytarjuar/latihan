import { Request, Response, NextFunction } from 'express';

// Define a custom error type
interface ErrorResponse extends Error {
  statusCode?: number;
}

// Error handler middleware
const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  // Set default status code if not provided
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error (you can use Winston or any other logger here)
  console.error(err);

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      // Optionally include stack trace in development environment
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

export default errorHandler;
