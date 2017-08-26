const express = require('express');

const router = express.Router();
const locationController = require('./locationController');
const authController = require('./authController');

router.get('/v1/locations', locationController.getLocations);
router.post('/v1/locations', locationController.postLocation);
router.get('/v1/locations/:id', locationController.getLocationById);
router.put('/v1/locations/:id', locationController.putLocation);
router.delete('/v1/locations/:id', locationController.deleteLocation);

router.post('/v1/auth', authController.getAuth);

module.exports = router;
