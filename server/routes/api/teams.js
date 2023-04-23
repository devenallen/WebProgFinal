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
  
  // @route   POST api/teams/create-team
  // @desc    Create a new team
  // @access  Public
  router.post('/create-team', (req, res) => {
    const newTeam = new Team({
      id: req.body.id,
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

  // @route   POST api/teams/delete-team
  // @desc    Delete a team
  // @access  Public
  router.post('/delete-team', (req, res) => {
    Team.findOneAndDelete({ id: req.body.id })
      .then(team => {
        console.log("Team deleted");
      })
      res.json("Post deleted");
  });

  // @route  PUT api/teams/edit-team/:id
  // @desc   Edit a team
  // @access Public
  router.put('/edit-team/:id', (req, res) => {
    const { myid } = req.params;
    const { id, name, captain, numPlayers, logo } = req.body;

    Team.findOneAndUpdate({ myid }, { id, name, captain, numPlayers, logo }, { new: true })
      .then(team => {
        console.log("Team updated");
        res.json(team);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: 'Unable to update this team' });
      });
  });


module.exports = router;