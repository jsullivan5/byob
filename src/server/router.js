const express = require('express');

const router = express.Router();
const cameraController = require('./cameraController');
const locationController = require('./locationController');
const authController = require('./authController');

router.get('/v1/cameras', cameraController.getCameras);
router.post('/v1/cameras', authController.checkAuth, cameraController.addCamera);
router.get('/v1/cameras/:id', cameraController.getCamerasById);
router.put('/v1/cameras/:id', authController.checkAuth, cameraController.updateCamera);
router.delete('/v1/cameras/:id/:token', authController.checkAuth, cameraController.deleteCamera);

router.get('/v1/locations', locationController.getLocations);
router.post('/v1/locations', authController.checkAuth, locationController.postLocation);
router.get('/v1/locations/:id', locationController.getLocationById);
router.put('/v1/locations/:id', authController.checkAuth, locationController.updateLocation);
router.delete('/v1/locations/:id/:token', locationController.deleteLocation);

router.post('/v1/auth', authController.getAuth);

module.exports = router;
