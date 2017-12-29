const mongoose = require('mongoose');

const notesEntrySchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    text: String,
    attachment: []
  }, { timestamps: true });

const NotesEntry = mongoose.model("NotesEntry", notesEntrySchema);

module.exports = NotesEntry;