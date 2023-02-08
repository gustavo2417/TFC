import { Request, Response } from 'express';
import matchesService from '../services/Matches.service';

const getAllTeams = async (_req: Request, res: Response) => {
  const teams = await matchesService.getAll();

  return res.status(200).json(teams);
};

export default {
  getAllTeams,
};
