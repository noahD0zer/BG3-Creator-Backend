const express = require('express');
const router = express.Router();
const Background = require('../models/background');
const Class = require('../models/class');
const Race = require('../models/race');
const Proficiency = require('../models/proficiency');




router.get('/backgrounds', async (req, res) => {
  try {
    const backgrounds = await Background.find({}); // Fetch background names
    res.status(200).json(backgrounds);
  } catch (err) {
    console.error('Error fetching backgrounds:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/races', async (req, res) => {
    try {
      const races = await Race.find({}); // Fetch race names
      res.status(200).json(races);
    } catch (err) {
      console.error('Error fetching races:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/classes', async (req, res) => {
    try {
      const classes = await Class.find({});
      const classData = classes.map((classObj) => ({ class: classObj.class }));
      res.status(200).json(classData);
    } catch (err) {
      console.error('Error fetching classes:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/proficiencies', async (req, res) => {
    try {
      const proficiencies = await Proficiency.find({});
      res.status(200).json(proficiencies);
    } catch (err) {
      console.error('Error fetching proficiencies:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  

module.exports = router;
