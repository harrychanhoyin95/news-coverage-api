import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  jwtSecret: process.env.JWT_SECRET,
  api: {
    prefix: '/api',
  },
  newsApiKey: process.env.NEWS_API_KEY,
  databaseURL: process.env.DATABASE_URL,
};