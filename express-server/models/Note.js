const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    text: String,
    attachment: String,
    thumbnails: [
      { data: String, contentType: String }
    ],
    deleted: { type: Boolean, default: false }
  }, { timestamps: true });

const Note = mongoose.model('Note', noteSchema, 'notes');

module.exports = Note;