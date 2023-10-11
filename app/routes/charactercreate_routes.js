const express = require('express');
const router = express.Router();
const Background = require('../models/background');
const Class = require('../models/class');
const Race = require('../models/race');


// Define a route to fetch background data
router.get('/backgrounds', async (req, res) => {
  try {
    const backgrounds = await Background.find({}, 'background'); // Fetch background names
    res.json(backgrounds);
  } catch (err) {
    console.error('Error fetching backgrounds:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/races', async (req, res) => {
    try {
      const races = await Race.find({}, 'race'); // Fetch race names
      res.json(races);
    } catch (err) {
      console.error('Error fetching races:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/classes', async (req, res) => {
    try {
      const classes = await Class.find({}, 'class');
      const classData = classes.map((classObj) => ({ class: classObj.class }));
      res.json(classData);
    } catch (err) {
      console.error('Error fetching classes:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
