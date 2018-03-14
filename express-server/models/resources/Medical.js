const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('../models/Resource');

const medicalSchema = new Schema({
    without_cost: Boolean,
    waitlist_time: { type: String},
    schedule_availability: [String]
  }, { discriminatorKey: 'kind', timestamps: true });

const Housing = Resource.discriminator('Housing', medicalSchema);

module.exports = Housing;