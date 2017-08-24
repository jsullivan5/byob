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

module.exports = {
  getLocations,
};
