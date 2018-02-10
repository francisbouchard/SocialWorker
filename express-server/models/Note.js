const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    text: String,
    attachment: []
  }, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;