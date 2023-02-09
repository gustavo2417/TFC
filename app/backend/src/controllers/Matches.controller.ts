import { Request, Response } from 'express';
import matchesService from '../services/Matches.service';

const getAllTeams = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === 'true') {
    const teams = await matchesService.getAllInProgressTrue();

    return res.status(200).json(teams);
  }

  if (inProgress === 'false') {
    const teams = await matchesService.getAllInProgressFalse();

    return res.status(200).json(teams);
  }

  const teams = await matchesService.getAll();

  return res.status(200).json(teams);
};

export default {
  getAllTeams,
};
