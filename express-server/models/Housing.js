const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('../models/Resource');

const housingSchema = new Schema({
    term: { type: String, required: true},
    gender: String,
    constraints: [String]
  }, { discriminatorKey: 'kind', timestamps: true });

const Housing = Resource.discriminator('Housing', housingSchema, 'housings');

module.exports = Housing;