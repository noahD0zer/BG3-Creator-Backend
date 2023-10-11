// In your BG3-Creator-Backend project
const mongoose = require('mongoose');

const backgroundSchema = new mongoose.Schema({
  background: String,
  proficiencyName: String,
});

module.exports = mongoose.model('Background', backgroundSchema);

