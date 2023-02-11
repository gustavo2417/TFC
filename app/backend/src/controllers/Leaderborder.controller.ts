import { Request, Response } from 'express';
import leaderboardServices from '../services/Leaderboard.service';

const teste = async (_req: Request, res: Response) => {
  const result = await leaderboardServices.getTeams();

  return res.status(200).json(result);
};

export default {
  teste,
};
