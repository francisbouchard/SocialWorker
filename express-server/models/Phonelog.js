const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phonelogSchema = new Schema({
    name: String,
    pronoun: String,
    user: Schema.Types.ObjectId,
    urgent: Boolean,
    phonenumber: String,
    notes: [String],
    date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Phonelog = mongoose.model('Phonelog', phonelogSchema);

module.exports = Phonelog;