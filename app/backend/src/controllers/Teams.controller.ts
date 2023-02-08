import { Request, Response } from 'express';
import teamsService from '../services/Teams.service';

const getAllTeams = async (_req: Request, res: Response) => {
  const teams = await teamsService.getAll();

  return res.status(200).json(teams);
};

export default {
  getAllTeams,
};
