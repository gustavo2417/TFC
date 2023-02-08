import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User.model'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mock = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

describe('Testando rota /login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa se retorna um token valido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: 'secret_user' })

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Testa se não é possivel fazer login com uma senha invalida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: '999999' })

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'Incorrect email or password'});
  });

  it('Testa se não é possivel fazer login sem um email e senha', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: '', password: '' })

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'All fields must be filled'});
  });

  it('Testa que é impossivel logar sem um token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'Token not found'});
  });
});
