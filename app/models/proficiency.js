const mongoose = require('mongoose');

const proficiencySchema = new mongoose.Schema({
  proficiencyName: String,
  proficiencyType: String,
});

module.exports = mongoose.model('Proficiency', proficiencySchema);
