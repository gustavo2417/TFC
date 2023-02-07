import { Request, Response, NextFunction } from 'express';
import { compareSync } from 'bcryptjs';
import User from '../services/Login.service';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let result;

  const user = await User.getUserByEmail(email);

  if (user) {
    result = compareSync(password, user.password);
  }

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (!result) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export default validateLogin;
