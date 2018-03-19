const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('../../models/Resource');

const medicalSchema = new Schema({
    without_cost: { type: String},
    waitlist_time: { type: String},
    schedule_availability: { type: String},
  }, { discriminatorKey: 'kind', timestamps: true });

const Medical = Resource.discriminator('Medical', medicalSchema);

module.exports = Medical;