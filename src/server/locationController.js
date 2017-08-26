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

  for (const requiredParameter of ['name', 'address', 'description', 'insider_tips', 'lat', 'long']) {
    if (!newLocation[requiredParameter]) {
      return res.status(422).json({
        status: 'Error',
        data: `Missing required parameter ${requiredParameter}`,
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

const deleteLocation = (req, res) => {
  const locationId = parseInt(req.params.id, 10);
  DB('locations')
    .del()
    .where({
      id: locationId,
    })
    .then((location) => {
      res.status(204).send('Success');
    })
    .catch((err) => {
      res.status(404).send('Resource not found');
    });
};

module.exports = {
  getLocations,
  getLocation,
  postLocation,
  putLocation,
  deleteLocation,
};
