const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    type: String,
    date: {type: Date, default: Date.now},
    attachment: [],
    deleted: { type: Boolean, default: false }
  }, { timestamps: true });

const Document = mongoose.model('Document', documentSchema, 'documents');

module.exports = Document;