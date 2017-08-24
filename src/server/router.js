const express = require('express');

const router = express.Router();
const locationController = require('./locationController');

router.get('/v1/locations', locationController.getLocations);


module.exports = router;
