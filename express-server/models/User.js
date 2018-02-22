const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

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
    }
  }, { timestamps: true });

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