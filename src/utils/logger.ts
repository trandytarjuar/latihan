import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment-timezone';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) Object.assign(info, { message: info.stack });
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error', 'info'],
      format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf(
          ({ level, message, timestamp }) => `[${moment(timestamp).format('YYYY-MM-DD H:m:ss')}] ${level}: ${message}`,
        ),
      ),
    }),
    new DailyRotateFile({
      filename: 'logs/%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      // prepend: true,
      level: 'error',
      format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf(
          ({ level, message, timestamp }) => `[${moment(timestamp).format('YYYY-MM-DD H:m:ss')}] ${level}: ${message}`,
        ),
      ),
    }),
    new DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      // prepend: true,
      format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf(
          ({ level, message, timestamp }) => `[${moment(timestamp).format('YYYY-MM-DD H:m:ss')}] ${level}: ${message}`,
        ),
      ),
    }),
  ],
});

export default logger;
