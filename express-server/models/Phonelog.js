const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phonelogSchema = new Schema({
    name: String,
    pronouns: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    urgent: Boolean,
    phonenumber: String,
    subject: String,
    notes: [String],
    callertype: String,
    date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Phonelog = mongoose.model('Phonelog', phonelogSchema, 'phonelogs');

module.exports = Phonelog;