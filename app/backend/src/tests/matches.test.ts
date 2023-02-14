import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Matches.model'
import mocks from './mocks/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const newMatch = {
  homeTeamId: 16,
  homeTeamGoals: 6,
  awayTeamId: 4,
  awayTeamGoals: 4,
};

describe('Testando rota /matches', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(mocks.matchesMock as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Testa se retorna corretamente todas as partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mocks.matchesMock);
  });

  it('Testa se retorna corretamente todas as partidas que estão em andamento', async () => {
    (Matches.findAll as sinon.SinonStub).restore();

    sinon
      .stub(Matches, "findAll")
      .resolves(mocks.mockMatchesInprogress as unknown as Matches[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockMatchesInprogress);
  });

  it('Testa se retorna corretamente todas as partidas que já foram finalizadas', async () => {
    (Matches.findAll as sinon.SinonStub).restore();

    sinon
      .stub(Matches, "findAll")
      .resolves(mocks.mockMatchesFinisheds as unknown as Matches[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockMatchesFinisheds);
  });

  it('Testa se finaliza com sucesso uma partida', async () => {
    sinon
      .stub(Matches, "update")
      .resolves();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/45/finish')
      

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({message:'Finished'});
  });

  it('Testa se finaliza com sucesso uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/45')
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      });
      

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({message:'Match has been updated'});
  });

  it('Testa se retorna o erro esperado se tentar criar uma paritda sem o token', async () => {
    sinon
      .stub(Matches, "create")
      .resolves();

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(newMatch)
      

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({message:'Token not found'});
  });
});
