const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('../models/Resource');

const medicalSchema = new Schema({
    waitlist_time: { type: String},
    without_cost: Boolean,
    schedule_availability: [String]
  }, { discriminatorKey: 'kind', timestamps: true });

const Housing = Resource.discriminator('Housing', medicalSchema);

module.exports = Housing;