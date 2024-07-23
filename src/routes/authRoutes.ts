import { Router } from 'express';
import { login, register } from '../controllers/AuthController';

const router = Router();

// Render login page
router.get('/login', (req, res) => res.render('login'));

// Handle login
router.post('/login', login);

// Render registration page (optional)
router.get('/register', (req, res) => res.render('register'));

// Handle registration (optional)
router.post('/register', register);

export default router;
