const express = require('express');
const router = express.Router();
const User = require('../models/Users');

/**
 * test user /test
 * Login page.
 */
router.get('/', (req, res) => {
  User.create({password:"test"}).then(val => {
    res.send(val)
  }, err => {
    res.send(err)
  })

  });

  module.exports = router;