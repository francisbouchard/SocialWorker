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

const Casefile = mongoose.model('Casefile', casefileSchema);

module.exports = Casefile;