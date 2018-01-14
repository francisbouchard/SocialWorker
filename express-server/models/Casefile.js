const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casefileSchema = new Schema({
  participant: { type: String, ref: 'Participant', required: true },
  contactedResources: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Resource', sparse: true, required: true },
    status: String
  }],
  status: String,
  notes: [String],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const Casefile = mongoose.model('Casefile', casefileSchema);

module.exports = Casefile;