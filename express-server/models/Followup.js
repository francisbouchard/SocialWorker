const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followupSchema = new Schema({
    description: { type: String, required: true},
    date: Date,
    user: { type: String, ref: 'User'},
    participant: { type: Schema.Types.ObjectId, ref: 'Participant'},
    deleted: Boolean
});

const Followup = mongoose.model('Followup', followupSchema, 'followups');

module.exports = Followup;