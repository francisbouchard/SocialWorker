const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  participant: { type: String, ref: 'Participant', required: true },
  contactedResources: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Resource', sparse: true, required: true },
    status: String
  }],
  status: String,
  notes: [String],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;