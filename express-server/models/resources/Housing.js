const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('../../models/Resource');

const housingSchema = new Schema({
    term: { type: String},
    gender: String,
    constraints: [String]
  }, { discriminatorKey: 'kind', timestamps: true });

const Housing = Resource.discriminator('Housing', housingSchema);

module.exports = Housing;