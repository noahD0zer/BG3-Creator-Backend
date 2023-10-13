const express = require('express');
const router = express.Router();
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const Background = require('../models/background');
const Class = require('../models/class');
const Race = require('../models/race');
const Proficiency = require('../models/proficiency');
const Character = require('../models/character');

const removeBlanks = require('../../lib/remove_blank_fields')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404




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

// CREATE
// POST /characters
router.post('/characters', requireToken, (req, res, next) => {
  console.log('this is req.body.character', req.body.character)
	req.body.character.owner = req.user.id

	Character.create(req.body.character)
		.then((char) => {
			res.status(201).json({ character: char.toObject() })
		})
		.catch(next)
});

// INDEX - User Specific
// GET /characters/mine
router.get('/characters/mine', requireToken, (req, res, next) => {
    Character.find({ owner: req.user._id })
      .then((characters) => {
        if (!characters) {
          return res.status(404).json({ message: 'No characters found for the current user' });
        }
        return characters.map((character) => character.toObject());
      })
      // Respond with status 200 and JSON of the characters
      .then((characters) => res.status(200).json({ characters: characters }))
      // If an error occurs, pass it to the handler
      .catch(next);
});

// SHOW
// GET /characters/:id
router.get('/characters/:id', (req, res, next) => {
    // req.params.id will be set based on the `:id` in the route
    Character.findById(req.params.id)
      .populate('owner') // Populate owner field if needed
      .then(handle404)
      .then((character) => res.status(200).json({ character: character.toObject() }))
      // If an error occurs, pass it to the error handler
      .catch(next);
});

// UPDATE
// PATCH /characters/:id
router.patch('/characters/:id', requireToken, removeBlanks, (req, res, next) => {
    // Remove the `owner` property from the request body to prevent unauthorized changes
    delete req.body.character.owner;
  
    // Find the character by its ID
    Character.findById(req.params.id)
      .then(handle404)
      .then((character) => {
        // Ensure that the current user is the owner of the character
        requireOwnership(req, character);
  
        // Update the character with the data from the request body
        return character.updateOne(req.body.character);
      })
      .then(() => {
        // If the update succeeded, return a 204 status (No Content)
        res.sendStatus(204);
      })
      .catch(next); // Pass any errors to the error handler
});
  
// DESTROY
// DELETE /characters/:id
router.delete('/characters/:id', requireToken, (req, res, next) => {
    // Find the character by its ID
    Character.findById(req.params.id)
      .then(handle404)
      .then((character) => {
        // Ensure that the current user is the owner of the character
        requireOwnership(req, character);
        
        // Delete the character from the database
        return character.deleteOne();
      })
      .then(() => {
        // If the deletion succeeded, respond with a 204 status (No Content)
        res.sendStatus(204);
      })
      .catch(next); // Pass any errors to the error handler
});
  
  
module.exports = router;
