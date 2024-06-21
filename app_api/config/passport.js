const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
  usernameField: 'email'
// This is an Async function for handling user authentication
}, async (username, password, done) => {
  try {
    // Attempt to find the user by email
    const user = await User.findOne({ email: username });
    // If no user is found, return a message indicating incorrect username
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
    // If the password is invalid, the code will return a message indicating incorrect password
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    // If user is found and password is valid, return the user
    return done(null, user);
    // Catch any errors that occur during the process and pass them to done()
  } catch (err) {
    return done(err);
  }
}));
