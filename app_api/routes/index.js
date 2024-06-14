const express = require('express'); // Express app
const router = express.Router(); // Router logic

// This is where we import controllers we will route
const tripsController = require('../controllers/trips');

// define router for our trips endpoint
router
    .route('/trips') // Add leading slash here
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);
    
module.exports = router;