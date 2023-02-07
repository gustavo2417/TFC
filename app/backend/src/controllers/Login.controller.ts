import { Request, Response } from 'express';
import loginService from '../services/Login.service';
import jwt from '../auth/jwt.auth';

const login = async (req: Request, res: Response) => {
  const { body } = req;
  const user = await loginService.getUserByEmail(body.email);

  if (!user) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }

  return res.status(200).json({ token: jwt(body) });
};

export default {
  login,
};
