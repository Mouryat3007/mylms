import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const config: ConnectionOptions = {
  type: 'sqlite',
  database: process.env.DB_NAME || 'lms.db',
  synchronize: true,
  entities: ['src/entities/**/*.ts'],
};

export default config;