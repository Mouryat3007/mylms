// src/server.ts

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { createConnection } from 'typeorm';
import { errorHandler } from './middlewares/error.handler';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
createConnection()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: any) => console.log('TypeORM connection error: ', error));