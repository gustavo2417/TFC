import { sign } from 'jsonwebtoken';

interface Login {
  email: string,
  password: string;
}

const secret = process.env.JWT_SECRET || 'senhaFantástica';

const jwtConfig = { expiresIn: '30min', algorithm: 'HS256' };

const loginToken = (login: Login) => {
  const token = sign({ data: login }, secret, jwtConfig as object);

  return token;
};

export default loginToken;
