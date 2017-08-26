const DB = require('./knex');

const getCameras = (req, res) => {
  DB('cameras').select()
    .then(cameras => res.status(200).json({
      status: 'success',
      data: cameras,
    }))
    .catch(error => res.status(500).json({
      status: 'error',
      data: error,
    }));
};

const getCamerasById = (req, res) => {
  DB('cameras').where('id', req.params.id).select()
    .then(camera => (camera.length ? res.status(200).json({
      status: 'success',
      data: camera,
    }) : res.status(404).json({
      error: 'That camera does not exist.',
    })))
    .catch(error => res.status(500).json({
      status: 'error',
      data: error,
    }));
};

module.exports = {
  getCameras,
  getCamerasById,
};
