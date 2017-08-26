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
          res.body.status.should.equal('success');
          res.body.data.should.be.a('array');
          res.type.should.equal('application/json');
          res.body.data.length.should.equal(30);
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
          res.body.status.should.equal('success');
          res.body.data.should.be.a('array');
          res.type.should.equal('application/json');
          res.body.data.length.should.equal(1);
          res.body.data[0].should.include.keys(
            'id', 'name', 'address', 'description', 'insider_tips', 'lat', 'long', 'altitude');
          res.body.data[0].id.should.equal(4198);
          res.body.data[0].name.should.equal('Crist LLC');
          res.body.data[0].address.should.equal('5278 Gottlieb Groves');
          res.body.data[0].lat.should.equal('39.740081583333335');
          res.body.data[0].long.should.equal('39.740081583333335');
          done();
        });
    });
    it('should respond with a 404 error if location is not found.', (done) => {
      chai.request(server)
        .get('/api/v1/locations/00000')
        .end((err, res) => {
          should.exist(err);
          res.should.have.status(404);
          res.type.should.equal('application/json');
          res.body.status.should.equal('error');
          res.body.data.error.should.equal('Location with id 00000 not found.');
          done();
        });
    });
  });
  describe('POST /api/v1/locations', () => {
    it.skip('should respond with a success message along with a single location that was added', (done) => {
      chai.request(server)
        .post('/api/v1/locations')
        .send({
          name: 'Chucky Cheese',
          address: '123 Faux Dr.',
          description: 'Near the Whackamole game',
          insider_tips: 'Play lazer tag',
          lat: '40',
          long: '40',
          altitude: '40',
        })
        .end((err, res) => {
          const { id } = res.body.data[0];
          const { name } = res.body.data[0];

          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.equal('Success');
          res.body.data[0].should.include.keys('id', 'name', 'address', 'description', 'insider_tips', 'lat', 'long', 'altitude');
          chai.request(server)
            .get(`/api/v1/locations/${id}`)
            .end((error, response) => {
              response.should.have.status(200);
              res.type.should.equal('application/json');
              response.body.data.should.be.a('array');
              response.body.data.length.should.equal(1);
              response.body.data[0].id.should.equal(id);
              res.body.data[0].name.should.equal(name);
              res.body.data[0].should.include.keys('id', 'name', 'address', 'description', 'insider_tips', 'lat', 'long', 'altitude');
              done();
            });
        });
    });
    it.skip('should return a 422 error if required parameters are missing.', (done) => {
      chai.request(server)
        .post('/api/v1/locations')
        .send({
          // Missing name
          address: '123 Faux Dr.',
          description: 'Near the Whackamole game',
          insider_tips: 'Play lazer tag',
          lat: '40',
          long: '40',
          altitude: '40',
        })
        .end((err, res) => {
          should.exist(err);
          res.should.have.status(422);
          res.body.status.should.equal('Error');
          res.body.message = 'Missing required parameter name.';
          done();
        });
    });
  });
  describe('PUT /api/locations/:id', () => {
    it.skip('should respond with a success message along with a single user that was updated', (done) => {
      knex('locations')
        .select('*')
        .then((location) => {
          const locationObject = location[0];
          chai.request(server)
            .put(`/api/v1/locations/${locationObject.id}`)
            .send({
              address: '456 McFakey St.',
              description: 'new description',
              insider_tips: 'new tips',
              lat: '50',
              long: '50',
              altitude: '50',
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.equal('Success');
              res.body.data[0].should.include.keys('id', 'name', 'address', 'description', 'insider_tips', 'lat', 'long', 'altitude');
              const newLocation = res.body.data[0];
              newLocation.address.should.not.equal(locationObject.address);
              newLocation.address.should.equal('456 McFakey St.');
              newLocation.description.should.not.equal(locationObject.description);
              newLocation.description.should.equal('new description');
              newLocation.insider_tips.should.not.equal(locationObject.insider_tips);
              newLocation.insider_tips.should.equal('new tips');
              newLocation.lat.should.not.equal(locationObject.lat);
              newLocation.lat.should.equal('50');
              newLocation.long.should.not.equal(locationObject.long);
              newLocation.long.should.equal('50');
              newLocation.altitude.should.not.equal(locationObject.altitude);
              newLocation.altitude.should.equal('50');
              done();
            });
        });
    });
  });
  describe('DELETE /api/v1/locations/:id', () => {
    it.skip('should respond with a success message and delete the resource', (done) => {
      chai.request(server)
        .get('/api/v1/locations/4198')
        .end((err1, res1) => {
          should.not.exist(err1);
          res1.should.have.status(200);
          res1.body.data[0].id.should.equal(4198);
          res1.body.data[0].name.should.equal('Crist LLC');
          res1.body.data[0].address.should.equal('5278 Gottlieb Groves');
          res1.body.data[0].lat.should.equal('39.740081583333335');
          res1.body.data[0].long.should.equal('39.740081583333335');
          chai.request(server)
            .delete('/api/v1/locations/4198')
            .end((err2, res2) => {
              res2.should.have.status(204);
              chai.request(server)
                .get('/api/v1/locations/4198')
                .end((er, re) => {
                  re.should.have.status(404);
                  done();
                });
            });
        });
    });
  });
  // describe('DELETE /api/v1/locations/:id', () => {
  //   it.skip('should respond with a success message and delete the resource', (done) => {
  //     knex('locations')
  //       .select('*')
  //       .then((locations) => {
  //         const locationObject = locations[0];
  //         const lengthB4Delete = locations.length;
  //         console.log(locationObject.id);
  //         chai.request(server)
  //           .delete(`/api/v1/locations/${locationObject.id}`)
  //           .end((err, res) => {
  //             // should.not.exist(err);
  //             res.status.should.equal(204);
  //             // done();
  //             knex('locations').select('*')
  //               .then((updatedLocations) => {
  //                 updatedLocations.length.should.equal(lengthB4Delete - 1);
  //               });
  //             done();
  //           });
  //       });
  //   });
  // });
});
