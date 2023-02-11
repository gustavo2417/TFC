import teamsModel from '../database/models/Teams.model';
// import matchesModel from '../database/models/Matches.model';

const tableTeam = {
  name: '',
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsOwn: 0,
  goalsFavor: 0,
  goalsBalance: 0,
  totalPoints: 0,
  efficiency: 0,
};

const getTeams = async () => {
  const allTeams = await teamsModel.findAll();

  const newTable = allTeams.map((team) => {
    const allTableTeams = {
      ...tableTeam,
      name: team.teamName,
    };
    return allTableTeams;
  });

  return newTable;
};

export default { getTeams };
