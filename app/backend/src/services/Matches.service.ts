import match from '../interfaces/Imatch';
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

const createMatch = async (newMatch: Omit<match, string>) => {
  const { dataValues } = await Matches.create(newMatch);

  const result = Matches.findByPk(dataValues.id);

  return result;
};

const updateMatchStatus = async (id: number) => {
  await Matches.update(
    { inProgress: false },
    { where: { id } },
  );
};

export default {
  getAll,
  getAllInProgressTrue,
  getAllInProgressFalse,
  createMatch,
  updateMatchStatus,
};
