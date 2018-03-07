const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const passportConfig = require('../config/passport');

/**
 * Log in a user to the application
 */
router.post('/login', (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(500).send({msg: errors[0].msg});
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).send({msg: info.message});
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
        return res.status(200).send({msg: 'Success! You are logged in.', role: user.role});
    });
  })(req, res, next);
});

/**
 * Sign up a user to the application
 */
router.post('/signup', (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(500).send({msg: errors});
  }

  const user = new User({
    name: req.body.name,
    pronouns: req.body.pronouns,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(400).send({msg: 'Account with that email address already exists.'});
    }
    user.save((err) => {
      if (err) { return next(err); }
      return res.status(200).send({msg: 'Created user '+req.body.email})
    });
  });
});

/**
 * Delete a user
 */
router.delete('/:id',  (req, res, next) => {
  User.remove({ _id: req.params.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    res.send({msg: [{ msg: 'The user account has been deleted.' }]});
  });
});

/**
 * Log out from the application
 */
router.post('/logout', (req, res, next) => {
  if(req.user){
    req.logout();
    res.send({msg: 'Logged out'})
  } else {
    res.status(400).send({msg:  'Not logged in'})
  }
});

/**
 * Heartbeat function used to check if user is still logged in
 */
router.post('/heartbeat', (req, res, next) => {
  if(req.user){
    res.send({loggedIn: true, role: req.user.role});
  } else {
    res.send({loggedIn: false, role: null})
  }
});

/**
 * Get all users
 */
router.get('/all', (req, res) => {
  User.find().then(data => {
      res.send(data);
  }, err => {
      res.send(err);
  })
});

module.exports = router;