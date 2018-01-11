const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Document = require('../models/Document').schema;
const Note = require('../models/Note').schema;

const participantSchema = new Schema({
    _id: {type: String, required: true},
    name: String,
    email: { type: String, sparse: true },
    phone: String,
    documents: [Document],
    notes: [Note]
  }, { _id: false, timestamps: true });

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;