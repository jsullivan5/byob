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

    it('should respond with a 404 error if camera is not found.', (done) => {
      chai.request(server)
        .get('/api/v1/cameras/2000')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.equal('error');
          res.body.data.error.should.equal('Camera with id (2000) was not found.');
          done();
        });
    });
  });

  describe('POST /api/v1/cameras', () => {
    it('should respond with a success message and the newly added camera', (done) => {
      chai.request(server)
        .post('/api/v1/cameras')
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
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'dimensions', 'effective_pixels', 'id', 'low_resolution',
            'macro_focus_range', 'max_resolution', 'model', 'normal_focus_range', 'price',
            'storage_included', 'weight', 'zoom_tele', 'zoom_wide');
          done();
        });
    });

    it('should return a 422 error if required parameters are missing.', (done) => {
      chai.request(server)
        .post('/api/v1/cameras')
        .send({
          max_resolution: 1080,
          low_resolution: 1080,
          effective_pixels: 0,
          zoom_wide: 38,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(422);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          res.body.data.error.should.equal('Missing required parameter of (model).');
          done();
        });
    });
  });

  describe('PUT /api/cameras/:id', () => {
    it('should respond with a success message along with a single camera that was updated', (done) => {
      chai.request(server)
        .put('/api/v1/cameras/1')
        .send({
          model: 'Apple iPhone 1000',
          max_resolution: 760,
          low_resolution: 420,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.equal('success');
          res.body.data[0].should.include.keys(
            'dimensions', 'effective_pixels', 'id', 'low_resolution',
            'macro_focus_range', 'max_resolution', 'model', 'normal_focus_range', 'price',
            'storage_included', 'weight', 'zoom_tele', 'zoom_wide');
          res.body.data[0].id.should.equal(1);
          res.body.data[0].model.should.equal('Apple iPhone 1000');
          res.body.data[0].max_resolution.should.equal(760);
          res.body.data[0].low_resolution.should.equal(420);
          res.body.data[0].effective_pixels.should.equal(0);
          res.body.data[0].zoom_wide.should.equal(38);
          done();
        });
    });
  });
});
