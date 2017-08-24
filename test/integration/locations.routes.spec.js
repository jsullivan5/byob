/* global describe */
/* global it */
/* global beforeEach */
/* global afterEach */

process.env.NODE_ENV = 'test';
const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

const knex = require('../../src/server/knex');
const server = require('../../src/server/server.js');

chai.use(chaiHttp);

describe('Testing Locations API Routes', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            knex.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  afterEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        done();
      });
  });

  describe('GET /api/v1/locations', () => {
    it('should respond with all the locations', (done) => {
      chai.request(server)
        .get('/api/v1/locations')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.status.should.equal('Success');
          res.body.data.should.be.a('array');
          res.type.should.equal('application/json');
          res.body.data.length.should.equal(28);
          res.body.data[0].should.include.keys(
            'id', 'name', 'address', 'description', 'insider_tips', 'lat', 'long', 'altitude');
          done();
        });
    });
  });
  describe('GET /api/v1/locations:/id', () => {
    it('should respond with a specific location', (done) => {
      chai.request(server)
        .get('/api/v1/locations/4198')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.status.should.equal('Success');
          res.body.data.should.be.a('array');
          res.type.should.equal('application/json');
          res.body.data.length.should.equal(1);
          res.body.data[0].should.include.keys(
            'id', 'name', 'address', 'description', 'insider_tips', 'lat', 'long', 'altitude');
          // res.body.dat
          done();
        });
    });
  });
});
