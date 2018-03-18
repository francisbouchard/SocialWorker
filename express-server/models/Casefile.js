const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casefileSchema = new Schema({
  participant: { type: Schema.Types.ObjectId, ref: 'Participant', required: true },
  contactedResources: [{
    resource: { type: Schema.Types.ObjectId, ref: 'Resource', sparse: true, required: true },
    isContacted: { type: Boolean, default: false },
    dateContacted: Date,
    note: String
  }],
  selectedResource: {
    resource: { type: Schema.Types.ObjectId, ref: 'Resource' },
    startDate: Date,
    endDate: Date
  },
  status: String,
  type: String,
  urgency: String,
  notes: [String],
  date: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Casefile = mongoose.model('Casefile', casefileSchema, 'casefiles');

module.exports = Casefile;