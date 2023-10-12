const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  race: String,
  proficiencyName: String,
});

module.exports = mongoose.model('Race', raceSchema);
