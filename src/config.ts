import { ConnectionOptions } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config: ConnectionOptions = {
  type: 'sqlite',
  database: process.env.DATABASE_PATH || path.resolve(__dirname, '../lms.db'),
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.LOGGING === 'true',
  entities: [path.resolve(__dirname, '../src/entities/**/*.ts')],
};

export default config;
