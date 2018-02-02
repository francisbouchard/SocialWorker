const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    type: String,
    date: {type: Date, default: Date.now},
    attachment: []
  }, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;