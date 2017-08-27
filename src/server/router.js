const express = require('express');

const router = express.Router();
const cameraController = require('./cameraController');
const locationController = require('./locationController');
const photoController = require('./photoController');
const authController = require('./authController');

router.get('/v1/cameras', cameraController.getCameras);
router.post('/v1/cameras', cameraController.addCamera);
router.get('/v1/cameras/:id', cameraController.getCamerasById);
router.put('/v1/cameras/:id', cameraController.updateCamera);
router.delete('/v1/cameras/:id', cameraController.deleteCamera);

router.get('/v1/locations', locationController.getLocations);
router.post('/v1/locations', locationController.postLocation);
router.get('/v1/locations/:id', locationController.getLocationById);
router.put('/v1/locations/:id', locationController.updateLocation);
router.delete('/v1/locations/:id', locationController.deleteLocation);

router.get('/v1/photos', photoController.getPhotos);

router.post('/v1/auth', authController.getAuth);

module.exports = router;
