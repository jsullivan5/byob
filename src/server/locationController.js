const DB = require('./knex');

const getLocations = (req, res) => {
  DB('locations').select('*')
    .then((locations) => {
      res.status(200).json({
        status: 'Success',
        data: locations,
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getLocation = (req, res) => {
  const locationId = parseInt(req.params.id, 10);

  DB('locations')
    .select('*')
    .where({
      id: locationId,
    })
    .then((location) => {
      res.status(200).json({
        status: 'Success',
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

const postLocation = (req, res) => {
  const newLocation = req.body;
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
};

module.exports = {
  getLocations,
  getLocation,
  postLocation,
};
