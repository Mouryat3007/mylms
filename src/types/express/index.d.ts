// src/types/express/index.d.ts
import { User } from '../entities/User'; // Adjust the path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}