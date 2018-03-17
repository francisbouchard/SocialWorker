const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    participant: { type: Schema.Types.ObjectId, ref: 'Participant'},
    deleted: { type: Boolean, default: false }
  }, { discriminatorKey: 'kind', timestamps: true });

const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;