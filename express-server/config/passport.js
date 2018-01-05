const passport = require("passport");
const passportLocal = require("passport-local");
const _ = require("lodash");

// import { User, UserType } from '../models/User';
const User = require("../models/Users");

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: "Invalid email or password." });
    });
  });
}));

/**
 * Login Required middleware.
 */
let passport = {
    isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
          return next();
        }
        res.redirect("/login");
      }
}


module.exports = passport;