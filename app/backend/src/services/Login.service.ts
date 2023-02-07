import User from '../database/models/User';

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

export default {
  getUserByEmail,
};
