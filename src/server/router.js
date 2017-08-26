const express = require('express');

const router = express.Router();
const locationController = require('./locationController');

router.get('/v1/locations', locationController.getLocations);
router.post('/v1/locations', locationController.postLocation);
router.get('/v1/locations/:id', locationController.getLocationById);
router.put('/v1/locations/:id', locationController.putLocation);
router.delete('/v1/locations/:id', locationController.deleteLocation);

module.exports = router;
