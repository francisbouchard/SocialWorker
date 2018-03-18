const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Document = require('../models/Document').schema;
const Note = require('../models/Note').schema;
const Casefile = require('./Casefile');

const participantSchema = new Schema({
  name: { type: String, required: true },
  pronouns: String,
  email: { type: String, sparse: true },
  telephone: String,
  address: String,
  socialmedia: {
    service: String,
    username: String
  },
  documents: [Document],
  username:String,
  notes: [Note],
  socialworkers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  deleted: { type: Boolean, default: false }
}, {timestamps: true});

participantSchema.pre('remove', function (next) {
  Casefile.remove({ participant: this._id }, next);
});

const Participant = mongoose.model('Participant', participantSchema, 'participants');

module.exports = Participant;