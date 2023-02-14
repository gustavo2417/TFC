import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import mocksLeaderboard from './mocks/leaderboard.mock';
import teamM from './mocks/teams.mock';
import matchesMock from './mocks/matches.mock';
import teams from '../database/models/Teams.model'
import Matches from '../database/models/Matches.model'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /leaderboard', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(teams, 'findAll')
      .resolves(teamM.mockTeams as any);
    sinon
      .stub(Matches, 'findAll')
      .resolves(matchesMock.matchs as any)
  });

  after(()=> {
    (teams.findAll as sinon.SinonStub).restore();
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Testa se a rota /leaderboard/home retorna um array', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array')
  });

  it('Testa se a rota /leaderboard/away retorna um array', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array')
  });
});