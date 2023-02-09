import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';

const getAll = async () => {
  const result = await Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return result;
};

const getAllInProgressTrue = async () => {
  const result = await Matches.findAll({
    where: { inProgress: true },
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return result;
};

const getAllInProgressFalse = async () => {
  const result = await Matches.findAll({
    where: { inProgress: false },
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return result;
};

export default {
  getAll,
  getAllInProgressTrue,
  getAllInProgressFalse,
};
