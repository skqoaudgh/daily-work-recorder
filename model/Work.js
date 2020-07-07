const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  creator: { type: Schema.ObjectId, required: true },
  work: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const Work = mongoose.model('Work', WorkSchema);

export default Work;
