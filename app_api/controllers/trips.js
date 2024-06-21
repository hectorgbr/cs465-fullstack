const mongoose = require("mongoose");
const Trip = require("../models/travlr"); // Register model
const Model = mongoose.model("trips");
const User = mongoose.model("users");

// Note: I modified the methods to include the async and await features, and added try-catch methods.

// GET: /trips - list all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
  const q = await Model.find({}) // No filter, return all records
    .exec();

  // Uncomment the following line to show results of the query on the console
  // console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Return resulting trip list
    return res.status(200).json(q);
  }
};

const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode }) // No filter, return all records
    .exec();

  // console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Return resulting trip list
    return res.status(200).json(q);
  }
};

// PUT: /trips/:tripCode - Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  await getUser(req, res, (req, res) => {
    try {
      const q = Model.findOneAndUpdate(
        { code: req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description,
        }
      ).exec();
      if (!q) {
        // Database returned no data
        return res.status(404).json({ message: "Trip not found" });
      } else {
        // Return resulting updated trip
        return res.status(200).json(q);
      }
    } catch (error) {
      console.error("Error updating trip:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

// POST: /trips - add a new trip
const tripsAddTrip = async (req, res) => {
  await getUser(req, res, (req, res) => {
    const q = Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

// DELETE: /trips/:tripCode - delete a single trip
const tripsDeleteTrip = async (req, res) => {
    console.log('TravelController#tripsDeleteTrip', req.params.tripCode);
    try {
      const trip = await Model.findOneAndDelete({ code: req.params.tripCode }).exec();
      if (!trip) {
        return res.status(404).send({ message: 'Trip not found with code ' + req.params.tripCode });
      }
      res.status(200).send({ message: `Trip ${req.params.tripCode} successfully deleted!` });
    } catch (err) {
      console.error('Error deleting trip:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

const getUser = async (req, res, callback) => {
  if (req.auth && req.auth.email) {
    try {
      const user = await User.findOne({ email: req.auth.email }).exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      callback(req, res, user.name);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "User not found" });
    }
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};