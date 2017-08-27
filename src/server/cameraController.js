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

const getCameraById = (req, res) => {
  DB('cameras').where('id', parseInt(req.params.id, 10)).select()
    .then(camera => (camera.length ? res.status(200).json({
      status: 'success',
      data: camera,
    }) : res.status(404).json({
      status: 'error',
      data: {
        error: `Camera with id (${parseInt(req.params.id, 10)}) was not found.`,
      },
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
        status: 'error',
        data: {
          error: `Missing required parameter of (${requiredParameter}).`,
        },
      });
    }
  }

  DB('cameras').insert(req.body, '*')
    .then(camera => res.status(201).json({
      status: 'success',
      data: camera[0],
    }))
    .catch(error => res.status(500).json({
      status: 'error',
      data: error,
    }));
};

const updateCamera = (req, res) => {
  DB('cameras')
    .update(req.body, '*')
    .where('id', parseInt(req.params.id, 10))
    .then((camera) => {
      res.status(200).json({
        status: 'success',
        data: camera,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        data: error,
      });
    });
};

const deleteCamera = (req, res) => {
  DB('cameras')
    .del()
    .where('id', parseInt(req.params.id, 10))
    .returning('*')
    .then((camera) => {
      res.status(200).send({
        status: 'success',
        data: {
          message: `Camera with id (${camera[0].id}) was deleted.`,
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
  getCameras,
  getCameraById,
  addCamera,
  updateCamera,
  deleteCamera,
};
