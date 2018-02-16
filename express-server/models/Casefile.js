const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casefileSchema = new Schema({
  participant: { type: String, ref: 'Participant', required: true },
  contactedResources: [{
    resource: { type: Schema.Types.ObjectId, ref: 'Resource', sparse: true, required: true },
    status: String,
    dateContacted: Date,
    note: String
  }],
  selectedResource: [{
    resource: { type: Schema.Types.ObjectId, ref: 'Resource' },
    startDate: Date,
    endDate: Date
  }],
  status: String,
  type: String,
  urgency: String,
  notes: [String],
  date: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Casefile = mongoose.model('Casefile', casefileSchema);

module.exports = Casefile;