const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Participant = require('./Participant');
const Phonelog = require('./Phonelog');
const NULL_USER = require('../config/null-objects').NULL_USER;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pronouns: String,
    email: { type: String, unique: true },
    password: String,
    tokens: Array,
    role: { type: String, default: "user" },
    profile: {
      name: String,
      picture: String
    },
    deleted: { type: Boolean, default: false }
  }, { timestamps: true });

  userSchema.pre('remove', function (next) {
    Participant.update({ socialworkers: this._id },
    { 'socialworkers.$': NULL_USER }, next);
  });

  userSchema.pre('remove', function (next) {
    Phonelog.update({ user: this._id },
    { user: NULL_USER }, next);
  });

  userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, undefined, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  });
  
  userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  };

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;