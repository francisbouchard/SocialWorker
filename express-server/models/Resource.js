const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, sparse: true },
    phone: String,
    location: String,
    notes: String,
    deleted: { type: Boolean, default: false }
  }, { discriminatorKey: 'kind', timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;