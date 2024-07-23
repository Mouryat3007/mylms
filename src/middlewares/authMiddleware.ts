import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.token;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    if (error.name === 'TokenExpiredError') {
      res.status(401).send('Session expired. Please log in again.');
    } else {
      res.status(401).send('Unauthorized');
    }
  }
};
