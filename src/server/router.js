const express = require('express');

const router = express.Router();
const cameraController = require('./cameraController');
const locationController = require('./locationController');

router.get('/v1/cameras', cameraController.getCameras);
router.get('/v1/cameras/:id', cameraController.getCamerasById);
router.get('/v1/locations', locationController.getLocations);

module.exports = router;
