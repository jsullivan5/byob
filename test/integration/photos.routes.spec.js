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

describe('Testing Photos API Routes', () => {
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

  describe('GET /api/v1/photos', () => {
    it('should respond with all photos', (done) => {
      chai.request(server)
        .get('/api/v1/photos')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys(
            'location_id', 'camera_id', 'id', 'url',
            'name', 'description', 'aperture_value', 'iso', 'exposure_mode',
            'shutter_speed', 'content_creation_date', 'gps', 'acquisition_model',
            'acquisition_make', 'fnumber', 'focal_length', 'lens_make', 'lens_model');
          done();
        });
    });

    it('should respond with all photos filtered by a query param', (done) => {
      chai.request(server)
        .get('/api/v1/photos?iso=100&camera_id=1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.equal(1);
          res.body.data[0].should.include.keys(
            'location_id', 'camera_id', 'id', 'url',
            'name', 'description', 'aperture_value', 'iso', 'exposure_mode',
            'shutter_speed', 'content_creation_date', 'gps', 'acquisition_model',
            'acquisition_make', 'fnumber', 'focal_length', 'lens_make', 'lens_model');
          done();
        });
    });

    it('should respond with a 500 if the query param is invalid', (done) => {
      chai.request(server)
        .get('/api/v1/photos?isa=100&camera_id=1')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(500);
          res.type.should.equal('application/json');
          res.body.status.should.equal('error');
          done();
        });
    });
  });

  describe('GET /api/v1/photos/:id', () => {
    it('should respond with a single photo with id 1', (done) => {
      chai.request(server)
        .get('/api/v1/photos/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys(
            'location_id', 'camera_id', 'id', 'url',
            'name', 'description', 'aperture_value', 'iso', 'exposure_mode',
            'shutter_speed', 'content_creation_date', 'gps', 'acquisition_model',
            'acquisition_make', 'fnumber', 'focal_length', 'lens_make', 'lens_model');
          done();
        });
    });

    it('should respond with a 404 error if photo is not found.', (done) => {
      chai.request(server)
        .get('/api/v1/photos/2000')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.equal('error');
          res.body.data.error.should.equal('Photo with id (2000) was not found.');
          done();
        });
    });
  });

  describe('POST /api/v1/photos', () => {
    it('should respond with a success message and the newly added photo', (done) => {
      chai.request(server)
        .post('/api/v1/photos')
        .send({
          name: 'A great picture of some mountains!',
          location_id: 4198,
          camera_id: 1,
          url: 'http://www.google.com',
          iso: 1600,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.include.keys(
            'location_id', 'camera_id', 'id', 'url',
            'name', 'description', 'aperture_value', 'iso', 'exposure_mode',
            'shutter_speed', 'content_creation_date', 'gps', 'acquisition_model',
            'acquisition_make', 'fnumber', 'focal_length', 'lens_make', 'lens_model');
          done();
        });
    });

    it('should return a 422 error if required parameters are missing.', (done) => {
      chai.request(server)
        .post('/api/v1/photos')
        .send({
          name: 'A great picture of some mountains!',
          camera_id: 1,
          url: 'http://www.google.com',
          iso: 1600,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(422);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          res.body.data.error.should.equal('Missing required parameter of (location_id).');
          done();
        });
    });
  });

  describe('PUT /api/photos/:id', () => {
    it('should respond with a success message along with a single photo that was updated', (done) => {
      chai.request(server)
        .put('/api/v1/photos/1')
        .send({
          name: 'This really needs to be a better photo name!',
          description: 'This is a photo from our vacation in Aruba.',
          url: 'http://www.bing.com',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.equal('success');
          res.body.data[0].should.include.keys(
            'location_id', 'camera_id', 'id', 'url',
            'name', 'description', 'aperture_value', 'iso', 'exposure_mode',
            'shutter_speed', 'content_creation_date', 'gps', 'acquisition_model',
            'acquisition_make', 'fnumber', 'focal_length', 'lens_make', 'lens_model');
          res.body.data[0].id.should.equal(1);
          res.body.data[0].name.should.equal('This really needs to be a better photo name!');
          res.body.data[0].description.should.equal('This is a photo from our vacation in Aruba.');
          res.body.data[0].url.should.equal('http://www.bing.com');
          done();
        });
    });
  });

  describe('DELETE /api/v1/photos/:id', () => {
    it('should respond with a success message and delete the resource', (done) => {
      chai.request(server)
        .delete('/api/v1/photos/1')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.status.should.equal('success');
          res.body.data.message.should.equal('Photo with id (1) was deleted.');
          done();
        });
    });
  });
});
