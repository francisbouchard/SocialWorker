const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Casefile = require('./Casefile');
const NULL_RESOURCE = require('../config/null-objects').NULL_RESOURCE;

const resourceSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, sparse: true },
  phone: String,
  location: String,
  notes: String,
  deleted: { type: Boolean, default: false }
}, { discriminatorKey: 'kind', timestamps: true });

resourceSchema.pre('remove', function (next) {
  Casefile.update({ 'selectedResource.resource': this._id },
    { 'selectedResource.resource': NULL_RESOURCE }, next);
});

resourceSchema.pre('remove', function (next) {
  Casefile.update({ 'contactedResources.resource': this._id },
    { 'contactedResources.$.resource': NULL_RESOURCE }, next);
});

const Resource = mongoose.model('Resource', resourceSchema, 'resources');

module.exports = Resource;