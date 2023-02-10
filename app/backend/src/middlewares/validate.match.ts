import { Request, Response, NextFunction } from 'express';
import teamsServices from '../services/Teams.service';

const validateTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const teams = await teamsServices.getAll();

  const homeTeam = teams.some((element) => element.id === homeTeamId);
  const awayTeam = teams.some((element) => element.id === awayTeamId);

  if (!homeTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  if (!awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  return next();
};

export default validateTeams;
