import teamsModel from '../database/models/Teams.model';
import matchesModel from '../database/models/Matches.model';
import leadeboard from '../interfaces/Ileaderboard';
import Imatch from '../interfaces/IreturnedMatch';

const tableTeam = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const fillTable = async (team: leadeboard, matches: Imatch[]) => {
  const result = matches.reduce((acc: leadeboard, current: Imatch) => {
    acc.totalGames += 1;
    if (current.homeTeamGoals > current.awayTeamGoals) {
      acc.totalVictories += 1;
      acc.totalPoints += 3;
    } if (current.homeTeamGoals === current.awayTeamGoals) {
      acc.totalDraws += 1;
      acc.totalPoints += 1;
    } if (current.homeTeamGoals < current.awayTeamGoals) {
      acc.totalLosses += 1;
    }
    acc.goalsFavor += current.homeTeamGoals;
    acc.goalsOwn += current.awayTeamGoals;
    acc.goalsBalance = (acc.goalsFavor - acc.goalsOwn);
    acc.efficiency = ((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2);

    return acc;
  }, team);

  return result;
};

const leaderboardHome = async () => {
  const allTeams = await teamsModel.findAll();

  const newTablesEmpty = allTeams.map((team) => {
    const allTableTeams = {
      ...tableTeam,
      name: team.teamName,
    };
    return allTableTeams;
  });

  const allMatchsTeams = await Promise.all(allTeams.map(async (teams, index) => {
    const matches = await matchesModel.findAll(
      { where: { homeTeamId: teams.id, inProgress: false } },
    );

    const result = fillTable(newTablesEmpty[index], matches);

    return result;
  }));

  return allMatchsTeams;
};

export default { leaderboardHome };
