const express = require('express');

const router = express.Router();
const cameraController = require('./cameraController');
const locationController = require('./locationController');

router.get('/v1/cameras', cameraController.getCameras);
router.post('/v1/cameras', cameraController.addCamera);
router.get('/v1/cameras/:id', cameraController.getCamerasById);
router.put('/v1/cameras/:id', cameraController.updateCamera);

router.get('/v1/locations', locationController.getLocations);
router.post('/v1/locations', locationController.postLocation);
router.get('/v1/locations/:id', locationController.getLocationById);
router.put('/v1/locations/:id', locationController.putLocation);
router.delete('/v1/locations/:id', locationController.deleteLocation);

module.exports = router;
