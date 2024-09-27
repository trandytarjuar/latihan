import path from 'path';
import { config as dotenvConfig } from 'dotenv-safe';

dotenvConfig({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
  allowEmptyValues: true,
});

interface JwtConfig {
  secret: string;
  expire: string;
  refreshExpire: string;
}

interface MongoConfig {
  uri: string;
}

interface Config {
  env: string | undefined;
  port: string | undefined;
  jwt: JwtConfig;
  mongo: MongoConfig;
  logs: 'combined' | 'dev';
  email: {
    host: string;
    port: number; // Ubah ke tipe `number`
    secure: boolean; // Tipe boolean untuk secure
    user: string;
    password: string;
    from: string;
  };
  qrcode: {
    qrattendance: string;
  };
  location: {
    centerLat: string;
    centerLon: string;
  };
  // EMAIL_USER: string | undefined;
  // EMAIL_PASS: string | undefined;
  // EMAIL_HOST: string | undefined;
  // EMAIL_PORT: string | undefined;
  // EMAIL_FROM: string | undefined;
  // EMAIL_SECURE: string | undefined;
}

const config: Config = {
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expire: process.env.JWT_EXPIRATION || '',
    refreshExpire: process.env.JWT_REFRESH_EXPIRATION || '',
  },
  mongo: {
    uri:
      process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URI || ''
        : process.env.MONGO_URI || '',
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  email: {
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587', 10), // Konversi ke integer
    secure: process.env.EMAIL_SECURE === 'false', // Konversi ke boolean
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    from: process.env.EMAIL_FROM || '',
  },
  qrcode: {
    qrattendance: process.env.ATTENDANCE || '',
  },
  location: {
    centerLat: process.env.CENTER_LAT || '',
    centerLon: process.env.CENTER_LON || '',
  },
};

export default config;
