import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
    req.session!.token = token;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};
