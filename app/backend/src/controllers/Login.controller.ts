import { Request, Response } from 'express';
import loginService from '../services/Login.service';
import jwt from '../auth/jwt.auth';

const login = async (req: Request, res: Response) => {
  const { body } = req;
  const user = await loginService.getUserByEmail(body.email);

  if (user) {
    return res.status(200).json({ token: jwt(user) });
  }
};

const loginValidate = async (req: Request, res: Response) => {
  const auth = req.body.user.data;

  const user = await loginService.getUserByEmail(auth.email);

  if (user) {
    const result = user.role;
    return res.status(200).json({ role: result });
  }
};

export default {
  login,
  loginValidate,
};
