const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  work: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String },
});

const Work = mongoose.model('Work', WorkSchema);

module.exports = Work;
