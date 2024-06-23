const express = require('express'); // Express app
const router = express.Router(); // Router logic
// I had to write the line of code like this to avoid errors
const {expressjwt: jwt } = require('express-jwt');
//const jwt  = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    // this function requires a algorithm
    algorithms: ['HS512']
});


// This is where we import controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// I added authentication routes
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// define router for our trips endpoint
router
    .route('/trips') // Add leading slash here
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)
    // I added a DELETE Method 
    .delete(auth, tripsController.tripsDeleteTrip);
    
module.exports = router;