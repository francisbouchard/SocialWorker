const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require("passport");
const passportConfig = require("../config/passport");

router.post('/login', (req, res, next) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(500).send({msg: errors});
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).send({msg: info.message});
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      res.send({ msg: "Success! You are logged in." });
    });
  })(req, res, next);
});




router.post('/signup', (req, res, next) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(500).send({msg: errors});
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(400).send({ msg: "Account with that email address already exists." });
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.send({msg: "Logged in"})
      });
    });
  });
});

router.delete('/',  (req, res, next) => {
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    res.send({ msg: "Your account has been deleted." });
  });
});

router.post('/logout', (req, res, next) => {
  if(req.user){
    req.logout();
    res.send({msg: "Logged out"})
  } else {
    res.status(400).send({msg: "Not logged in"})
  }
});

module.exports = router;