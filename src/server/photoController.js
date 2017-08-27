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

const getPhotoById = (req, res) => {
  DB('photos').where('id', parseInt(req.params.id, 10)).select()
    .then(photo => (photo.length ? res.status(200).json({
      status: 'success',
      data: photo,
    }) : res.status(404).json({
      status: 'error',
      data: {
        error: `Photo with id (${parseInt(req.params.id, 10)}) was not found.`,
      },
    })))
    .catch(error => res.status(500).json({
      status: 'error',
      data: error,
    }));
};

module.exports = {
  getPhotos,
  getPhotoById,
};
