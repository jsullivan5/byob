const express = require('express');

const router = express.Router();
const cameraController = require('./cameraController');

router.get('/v1/cameras', cameraController.getCameras);

module.exports = router;
