import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/Teams.model'
import mocks from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /teams', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(mocks.mockTeams as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Testa se retorna corretamente todos os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockTeams);
  });
});

describe('Testando rota /teams/:id', () => {

  let chaiHttpResponse: Response;
  
  before(async () => {
    sinon
      .stub(Teams, "findOne")
      .resolves(mocks.mockOne as Teams);
    });
  
  after(()=>{
    (Teams.findOne as sinon.SinonStub).restore();
  })
  
  it('Testa se retorna apenas um time', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/16')
  
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockOne);
  });

  it('Testa se retorna a mensagem de erro esperada quando não encontra um time', async () => {
    (Teams.findOne as sinon.SinonStub).restore();
    sinon
      .stub(Teams, "findOne")
      .resolves(null);
    
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/18')
  
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Team not found'});
  });
});