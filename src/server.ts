import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { createConnection } from 'typeorm';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import config from './config';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Logger middleware
app.use(morgan('dev'));

// Database connection
createConnection(config).then(() => {
  // Body parser middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: true,
  }));

  // Set view engine
  app.set('view engine', 'ejs');

  // Serve static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Routes
  app.use(authRoutes);
  app.use(courseRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).render('404');
  });

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

  // Start the server
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
}).catch(error => {
  console.error('Database connection error:', error);
});
