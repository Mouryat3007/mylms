import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: 'lms.db',
  synchronize: true,
  entities: ['src/entities/**/*.ts'],
};

export default config;
