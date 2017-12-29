const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
    identifier: {type: String, unique: true, required: true},
    name: String,
    email: { type: String, unique: true },
    phone: String,
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  }, { timestamps: true });

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;