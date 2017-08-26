const express = require('express');

const router = express.Router();
const cameraController = require('./cameraController');
const locationController = require('./locationController');

router.get('/v1/cameras', cameraController.getCameras);
router.post('/v1/cameras', cameraController.addCamera);
router.get('/v1/cameras/:id', cameraController.getCamerasById);
router.get('/v1/locations', locationController.getLocations);

module.exports = router;
