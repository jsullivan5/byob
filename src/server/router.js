const express = require('express');

const router = express.Router();
const cameraController = require('./cameraController');
const locationController = require('./locationController');
const photoController = require('./photoController');
const authController = require('./authController');

router.get('/v1/cameras', cameraController.getCameras);
router.post('/v1/cameras', authController.checkAuth, cameraController.addCamera);
router.get('/v1/cameras/:id', cameraController.getCameraById);
router.put('/v1/cameras/:id', authController.checkAuth, cameraController.updateCamera);
router.delete('/v1/cameras/:id/:token', authController.checkAuth, cameraController.deleteCamera);

router.get('/v1/locations', locationController.getLocations);
router.post('/v1/locations', authController.checkAuth, locationController.postLocation);
router.get('/v1/locations/:id', locationController.getLocationById);
router.put('/v1/locations/:id', authController.checkAuth, locationController.updateLocation);
router.delete('/v1/locations/:id/:token', locationController.deleteLocation);

router.get('/v1/photos', photoController.getPhotos);
router.get('/v1/photos/:id', photoController.getPhotoById);
router.post('/v1/photos', photoController.addPhoto);
router.put('/v1/photos/:id', photoController.updatePhoto);
router.delete('/v1/photos/:id', photoController.deletePhoto);

router.post('/v1/auth', authController.getAuth);

module.exports = router;
