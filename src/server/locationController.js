const DB = require('./knex');

const getLocations = (req, res) => {
  DB('locations').select('*')
    .then((locations) => {
      locations.length ?
        res.status(200).json({
          status: 'success',
          data: locations,
        }) :
        res.status(404).json({
          status: 'error',
          data: {
            error: 'No locations found.',
          },
        });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        data: error,
      });
    });
};

const getLocationById = (req, res) => {
  DB('locations').select().where('id', req.params.id)
    .then((location) => {
      location.length ?
        res.status(200).json({
          status: 'success',
          data: location,
        }) :
        res.status(404).json({
          status: 'error',
          data: {
            error: `Location with id ${req.params.id} not found.`,
          },
        });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        error,
      });
    });
};

const postLocation = (req, res) => {
  const newLocation = req.body;

  for (const requiredParameter of ['name', 'address', 'lat', 'long']) {
    if (!newLocation[requiredParameter]) {
      return res.status(422).json({
        status: 'Error',
        message: `Missing required parameter ${requiredParameter}.`,
      });
    }
  }
  DB('locations')
    .insert(newLocation)
    .returning('*')
    .then((location) => {
      res.status(201).json({
        status: 'Success',
        data: location,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Error',
        data: err,
      });
    });
  return true;
};

const putLocation = (req, res) => {
  const locationId = parseInt(req.params.id, 10);

  DB('locations')
    .update({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      insider_tips: req.body.insider_tips,
      lat: req.body.lat,
      long: req.body.long,
      altitude: req.body.altitude,
    })
    .where({
      id: locationId,
    })
    .returning('*')
    .then((location) => {
      res.status(200).json({
        status: 'Success',
        data: location,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Error',
        data: err,
      });
    });
};

const deleteLocation = (req, res, next) => {
  const locationId = parseInt(req.params.id, 10);
  console.log('----------------------', locationId);
  DB('locations').where('id', parseInt(req.params.id, 10)).del()
    .returning('*')
    .then((location) => {
      console.log('deleted', location);
      res.status(204).send({
        status: 'Success',
        message: `Location with id ${locationId} was deleted.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 'Error',
        error: err,
      });
    });
};

module.exports = {
  getLocations,
  getLocationById,
  postLocation,
  putLocation,
  deleteLocation,
};
