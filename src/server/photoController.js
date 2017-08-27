const DB = require('./knex');

const getPhotos = (req, res) => {
  DB('photos')
    .where(req.query)
    .select()
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

const addPhoto = (req, res) => {
  const newPhoto = req.body;
  for (const requiredParameter of ['location_id', 'camera_id', 'name']) {
    if (!newPhoto[requiredParameter]) {
      return res.status(422).json({
        status: 'error',
        data: {
          error: `Missing required parameter of (${requiredParameter}).`,
        },
      });
    }
  }

  DB('photos').insert(req.body, '*')
    .then(photo => res.status(201).json({
      status: 'success',
      data: photo[0],
    }))
    .catch(error => res.status(500).json({
      status: 'error',
      data: error,
    }));
};

const updatePhoto = (req, res) => {
  DB('photos')
    .update(req.body, '*')
    .where('id', parseInt(req.params.id, 10))
    .then((photo) => {
      res.status(200).json({
        status: 'success',
        data: photo,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        data: error,
      });
    });
};

const deletePhoto = (req, res) => {
  DB('photos')
    .del()
    .where('id', parseInt(req.params.id, 10))
    .returning('*')
    .then((photo) => {
      res.status(200).send({
        status: 'success',
        data: {
          message: `Photo with id (${photo[0].id}) was deleted.`,
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
  getPhotos,
  getPhotoById,
  addPhoto,
  updatePhoto,
  deletePhoto,
};
