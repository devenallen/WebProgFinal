const express = require('express');
const router = express.Router();
const Team = require('../../models/Team');

// @route   GET api/teams
// @desc    Get all teams
// @access  Public
router.get('/', (req, res) => {
    Team.find()
      .then((teams) => res.json({ teams }))
      .catch((err) => res.status(500).json({ error: 'Server error' }));
  });
  
  // @route   POST api/teams
  // @desc    Create a new team
  // @access  Public
  router.post('/', (req, res) => {
    const newTeam = new Team({
      name: req.body.name,
      captain: req.body.captain,
      numPlayers: req.body.numPlayers,
      image: req.body.image,
    });
  
    newTeam
      .save()
      .then((team) => res.json({ msg: 'Team added successfully', team }))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Unable to add this team' });
      });
  });


module.exports = router;