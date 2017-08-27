const DB = require('./knex');

const getLocations = (req, res) => {
  DB('locations')
    .select('*')
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
  DB('locations').select()
    .where('id', parseInt(req.params.id, 10))
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
        data: error,
      });
    });
};

const postLocation = (req, res) => {
  const newLocation = req.body;
  for (const requiredParameter of ['name', 'address', 'lat', 'lon']) {
    if (!newLocation[requiredParameter]) {
      return res.status(422).json({
        status: 'error',
        data: {
          error: `Missing required parameter ${requiredParameter}.`,
        },
      });
    }
  }
  DB('locations')
    .insert(newLocation)
    .returning('*')
    .then((location) => {
      res.status(201).json({
        status: 'success',
        data: location,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        data: error,
      });
    });
  return true;
};

const updateLocation = (req, res) => {
  DB('locations')
    .update({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      insider_tips: req.body.insider_tips,
      lat: req.body.lat,
      lon: req.body.lon,
      altitude: req.body.altitude,
    })
    .where('id', parseInt(req.params.id, 10))
    .returning('*')
    .then((location) => {
      res.status(200).json({
        status: 'success',
        data: location,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'Error',
        data: error,
      });
    });
};

const deleteLocation = (req, res, next) => {
  DB('locations')
    .where('id', parseInt(req.params.id, 10))
    .del()
    .returning('*')
    .then((location) => {
      res.status(200).send({
        status: 'success',
        data: {
          message: `Location with id (${location[0].id}) was deleted.`,
        },
      });
    })
    .catch((error) => {
      res.status(500).send({
        status: 'error',
        data: error,
      });
    });
};

module.exports = {
  getLocations,
  getLocationById,
  postLocation,
  updateLocation,
  deleteLocation,
};
