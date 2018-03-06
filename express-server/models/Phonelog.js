const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phonelogSchema = new Schema({
    name: String,
    pronouns: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User'},
    resolved: { type: Boolean, default: false },
    dateResolved:{ type: Date},
    urgent: Boolean,
    phonenumber: String,
    subject: String,
    language:String,
    notes: [String],
    message:String,
    callertype: String,
    date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Phonelog = mongoose.model('Phonelog', phonelogSchema, 'phonelogs');

module.exports = Phonelog;