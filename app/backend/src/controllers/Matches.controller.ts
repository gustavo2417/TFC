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

const create = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  const newMatch = {
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  };

  const result = await matchesService.createMatch(newMatch);

  return res.status(201).json(result);
};

const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  const numberId = parseInt(id, 10);

  await matchesService.updateMatchStatus(numberId);

  return res.status(200).json({ message: 'Finished' });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const updatedMatch = {
    homeTeamGoals,
    awayTeamGoals,
  };

  const numberId = parseInt(id, 10);

  await matchesService.updateMatch(numberId, updatedMatch);

  return res.status(200).json({ message: 'Match has been updated' });
};

export default {
  getAllTeams,
  create,
  updateStatus,
  update,
};
