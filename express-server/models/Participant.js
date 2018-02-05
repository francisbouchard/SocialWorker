const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Document = require('../models/Document').schema;
const Note = require('../models/Note').schema;

const participantSchema = new Schema({
  _id: { type: String, required: true },
  name: String,
  pronouns: String,
  email: { type: String, sparse: true },
  telephone: String,
  address: String,
  socialmedia: {
    service: String,
    username: String
  },
  documents: [Document],
  notes: [Note],
  socialworkers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { _id: false, timestamps: true });

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;