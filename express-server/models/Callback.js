const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callbackSchema = new Schema({
    description: { type: String, required: true},
    date: Date,
    user: { type: String, ref: 'User'},
    participant: { type: Schema.Types.ObjectId, ref: 'Participant'},
    deleted: Boolean
});

const Callback = mongoose.model('Callback', callbackSchema, 'callbacks');

module.exports = Callback;