import { Router } from 'express';
import { login, register } from '../controllers/AuthController';

const router = Router();

// Render login page
router.get('/login', (_req: any, res: { render: (arg0: string) => any; }) => res.render('login'));

// Handle login
router.post('/login', login);

// Render registration page (optional)
router.get('/register', (req: any, res: { render: (arg0: string) => any; }) => res.render('register'));

// Handle registration (optional)
router.post('/register', register);

export default router;