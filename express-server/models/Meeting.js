const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    minutes: { type: String},
    date: Date,
    users: [{ type: String, ref: 'User'}],
    audio: {type: String},
    deleted: Boolean
});

const Meeting = mongoose.model('Meeting', meetingSchema, 'meetings');

module.exports = Meeting;