import { Request, Response } from 'express';
import loginService from '../services/Login.service';
import jwt from '../auth/jwt.auth';

const login = async (req: Request, res: Response) => {
  const { body } = req;
  await loginService.getUserByEmail(body.email);

  return res.status(200).json({ token: jwt(body) });
};

export default {
  login,
};
