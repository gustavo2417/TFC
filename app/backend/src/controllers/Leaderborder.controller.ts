import { Request, Response } from 'express';
import leaderboardHome from '../services/Leaderboard.service';
import leaderboardAway from '../services/leaderboardAway.service';
import Leadeboard from '../interfaces/Ileaderboard';

const sort = (results: Leadeboard[]) => {
  const newSort = results.sort((a, b) =>
    b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);

  return newSort;
};

const getLeaderboardHome = async (_req: Request, res: Response) => {
  const leadeboard = await leaderboardHome.leaderboardHome();
  const result = sort(leadeboard);

  return res.status(200).json(result);
};

const getLeaderboardAway = async (_req: Request, res: Response) => {
  const leadeboard = await leaderboardAway.leaderboardAway();
  const result = sort(leadeboard);

  return res.status(200).json(result);
};

export default {
  getLeaderboardHome,
  getLeaderboardAway,
};
