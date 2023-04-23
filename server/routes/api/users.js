const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/login', (req, res) => {
    const existUser = new User({
        username: req.body.username,
        password: req.body.password,
    });

    existUser
        .save()
        .then((user) => res.json({ msg: 'User added successfully', user }))
        .catch((err) => {
            console.log(err);

            res.status(400).json({ error: 'Unable to add this user' });
        });
});

router.post('/signup', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });

    newUser
        .save()
        .then((user) => res.json({ msg: 'User added successfully', user }))
        .catch((err) => {
            console.log(err);

            res.status(400).json({ error: 'Unable to add this user' });
        });
});


module.exports = router;