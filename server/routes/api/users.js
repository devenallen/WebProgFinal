const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/login', async (req, res) => {
    
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) {
            // alert("incorrect username or doesnt exist");
            return res.status(400).json({ msg: 'Username incorrect or doesnt exist' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            // alert("incorrect password");
            return res.status(400).json({ msg: 'password incorrect' });
        }
        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, user: { id: user._id, username: user.username} });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.post('/signup', async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already exists' });
        } 
        const hashedPass = await bcrypt.hash(user.password, 10);
        const newUser = new User({ username: user.username, password: hashedPass });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tokenIsValid', async (req, res) => {
    try{
        const token = req.headers("x-auth-token");
        if (!token) return res.json({ isLoggedIn: false});  

        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json({ isLoggedIn: false});

        const user = await User.findById(verified.id);
        if (!user) return res.json({ isLoggedIn: false});

        return res.json({ isLoggedIn: true});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;