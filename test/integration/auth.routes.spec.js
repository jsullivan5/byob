/* global describe */
/* global it */

require('dotenv').config();

process.env.NODE_ENV = 'test';
const chai = require('chai');
const jwt = require('jsonwebtoken');


const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../../src/server/server.js');

chai.use(chaiHttp);

describe('POST /api/v1/auth', () => {
  it('should return a JWT with admin privilages when given a @turing.io email address.', (done) => {
    chai.request(server)
      .post('/api/v1/auth')
      .send({
        email: 'Marcellis.Wallace@turing.io',
        appName: 'PulpFiction',
      })
      .end((err, res) => {
        const token = res.body.token;
        const secret = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret);

        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.should.include.keys('token');
        decoded.should.include.keys('email', 'appName', 'admin', 'iat', 'exp');
        decoded.admin.should.equal(true);
        done();
      });
  });
  it('should return a JWT without admin privilages when given a non-@turing.io email address.', (done) => {
    chai.request(server)
      .post('/api/v1/auth')
      .send({
        email: 'BillGates@gmail.com',
        appName: 'IE Edge',
      })
      .end((err, res) => {
        const token = res.body.token;
        const secret = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret);

        should.not.exist(err);
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.should.include.keys('token');
        decoded.should.include.keys('email', 'appName', 'iat', 'exp');
        should.not.exist(decoded.admin);
        done();
      });
  });
});
