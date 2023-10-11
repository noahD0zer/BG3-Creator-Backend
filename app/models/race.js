// In your BG3-Creator-Backend project
const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  race: String,
  proficiencyName: String,
});

module.exports = mongoose.model('Race', raceSchema);
