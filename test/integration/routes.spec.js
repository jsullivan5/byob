/* global describe */
/* global it */

const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../../server.js');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should send text to home page', (done) => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        should.not.exist(err);
        response.should.have.status(200);
        done();
      });
  });
});

describe('API Routes', () => {
  it('should send text to home page', (done) => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
