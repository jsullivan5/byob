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

const addCamera = (req, res) => {
  const newCamera = req.body;
  for (const requiredParameter of ['model']) {
    if (!newCamera[requiredParameter]) {
      return res.status(422).json({
        error: `Missing required parameter of ${requiredParameter}`,
      });
    }
  }

  DB('cameras').insert(req.body, '*')
    .then(camera => res.status(201).json({
      status: 'success',
      message: 'New camera successfully created.',
      data: camera[0],
    }))
    .catch(error => res.status(500).json({
      status: 'error',
      data: error,
    }));
};

module.exports = {
  getCameras,
  getCamerasById,
  addCamera,
};
