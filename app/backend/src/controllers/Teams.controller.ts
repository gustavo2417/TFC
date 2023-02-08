import { Request, Response } from 'express';
import teamsService from '../services/Teams.service';

const getAllTeams = async (_req: Request, res: Response) => {
  const teams = await teamsService.getAll();

  return res.status(200).json(teams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idParse = parseInt(id, 10);
  const teams = await teamsService.getById(idParse);

  if (!teams) {
    return res.status(404).json({ message: 'Team not found' });
  }

  return res.status(200).json(teams);
};

export default {
  getAllTeams,
  getTeamById,
};
