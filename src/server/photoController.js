const DB = require('./knex');

const getPhotos = (req, res) => {
  DB('photos').select()
    .then(photos => res.status(200).json({
      status: 'success',
      data: photos,
    }))
    .catch(error => res.status(500).json({
      status: 'error',
      data: error,
    }));
};

module.exports = {
  getPhotos,
};
