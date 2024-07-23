import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY || 'default_secret_key',
      { expiresIn: '1h' }
    );

    if (req.session) {
      req.session.token = token;
    } else {
      return res.status(500).send('Session not initialized');
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = getRepository(User);

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = userRepository.create({
      username,
      password: hashedPassword,
    });

    await userRepository.save(newUser);
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal server error');
  }
};
