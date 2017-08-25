const express = require('express');

const router = express.Router();
const locationController = require('./locationController');

router.get('/v1/locations', locationController.getLocations);
router.post('/v1/locations', locationController.postLocation);
router.get('/v1/locations/:id', locationController.getLocation);

module.exports = router;
