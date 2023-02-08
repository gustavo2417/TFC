import Teams from '../database/models/Teams.model';

const getAll = async () => {
  const allTeams = await Teams.findAll();

  return allTeams;
};

export default {
  getAll,
};
