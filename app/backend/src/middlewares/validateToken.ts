import { Response, NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'senhaFantástica';

const validateToken = (token: string) => {
  try {
    const decoded = verify(token, secret);
    return decoded;
  } catch (err) {
    return false;
  }
};

const confirmToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decoded = validateToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.body.user = decoded;

  console.log(decoded);

  return next();
};

export default confirmToken;
