import { Request, Response } from 'express';
import leaderboardServices from '../services/Leaderboard.service';

const getLeaderboardHome = async (_req: Request, res: Response) => {
  const result = await leaderboardServices.leaderboardHome();

  result.sort((a, b) =>
    b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);

  return res.status(200).json(result);
};

export default {
  getLeaderboardHome,
};
