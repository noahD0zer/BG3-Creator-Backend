const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  class: String,
  proficiencyName: String,
});

module.exports = mongoose.model('Class', classSchema);

