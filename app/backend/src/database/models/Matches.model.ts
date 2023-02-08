import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './Teams.model';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
});

Match.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Teams.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Match;
