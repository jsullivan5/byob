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

module.exports = {
  getCameras,
};
