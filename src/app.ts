import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { createConnection } from 'typeorm';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import config from './config';

const app = express();

createConnection(config).then(() => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
  app.set('view engine', 'ejs');
  app.use(express.static('public'));

  app.use(authRoutes);
  app.use(courseRoutes);

  app.listen(3000, () => console.log('Server started on http://localhost:3000'));
}).catch(error => console.log(error));
