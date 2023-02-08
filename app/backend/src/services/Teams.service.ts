import Teams from '../database/models/Teams.model';

const getAll = async () => {
  const allTeams = await Teams.findAll();

  return allTeams;
};

const getById = async (id: number) => {
  const team = await Teams.findByPk(id);

  return team;
};

export default {
  getAll,
  getById,
};
