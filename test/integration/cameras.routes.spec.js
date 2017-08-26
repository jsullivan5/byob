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

describe('Testing Cameras API Routes', () => {
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

  it('should send text to home page', (done) => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  describe('GET /api/v1/cameras', () => {
    it('should respond with all cameras', (done) => {
      chai.request(server)
        .get('/api/v1/cameras')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(1042);
          res.body.data[0].should.include.keys(
            'dimensions', 'effective_pixels', 'id', 'low_resolution',
            'macro_focus_range', 'max_resolution', 'model', 'normal_focus_range', 'price',
            'storage_included', 'weight', 'zoom_tele', 'zoom_wide');
          done();
        });
    });
  });

  describe('GET /api/v1/cameras/:id', () => {
    it('should respond with a single camera with id 1', (done) => {
      chai.request(server)
        .get('/api/v1/cameras/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys(
            'dimensions', 'effective_pixels', 'id', 'low_resolution',
            'macro_focus_range', 'max_resolution', 'model', 'normal_focus_range', 'price',
            'storage_included', 'weight', 'zoom_tele', 'zoom_wide');
          done();
        });
    });

    it('should respond with an error message indicating the camera does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/cameras/2000')
        .end((err, res) => {
          should.exist(err);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.should.include.keys('error');
          res.body.error.should.eql('That camera does not exist.');
          done();
        });
    });
  });

  describe('POST /api/v1/cameras', () => {
    it('should respond with a success message and the newly added camera', (done) => {
      chai.request(server)
        .post('/api/v1/camera')
        .send({
          model: 'My new sweet camera',
          max_resolution: 1080,
          low_resolution: 1080,
          effective_pixels: 0,
          zoom_wide: 38,
          zoom_tele: 114,
          normal_focus_range: 70,
          macro_focus_range: 40,
          storage_included: 4,
          weight: 420,
          dimensions: 95,
          price: 179,
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 201 status code
          // (indicating that something was "created")
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 user object}
          res.body.data[0].should.include.keys(
            'dimensions', 'effective_pixels', 'id', 'low_resolution',
            'macro_focus_range', 'max_resolution', 'model', 'normal_focus_range', 'price',
            'storage_included', 'weight', 'zoom_tele', 'zoom_wide');
          done();
        });
    });
  });
});
