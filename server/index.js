const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('App is working'));
const port = process.env.PORT || 5000;           // 5000 is the default port MAKE SURE TO STICK WITH THIS PORT NUMBER

const mongoose = require('mongoose');
const cors = require('cors');

// Connect Database
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

const conn_str = 'mongodb+srv://devena4981:Sunsets324@devdatabase.nylh1ws.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect(conn_str, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {
    app.listen(port)
    console.log('MongoDB Connection Succeeded...')
})
.catch(err => {
    console.log('Error in DB connection ${err}');
})


const teams = require('./routes/api/teams');
const users = require('./routes/api/users');

app.use('/api/teams', teams);
app.use('/api/users', users);

// router.get('/', (req, res) => {res.send('testing get / team route')});
// router.post('/create-user', (req, res) => {res.send('testing post /create-user team route')});
//router.put('/edit-user/:name/:captain/:numPlayers', (req, res) => {res.send('testing put /edit-user team route')});
//router.get('/view-user/:name/:captain/:numPlayers', (req, res) => {res.send('testing get /view-user team route')});
//router.delete();
//router.post('/login', (req, res) => {res.send('testing post /login user route')});
//router.post('/signup', (req, res) => {res.send('testing post /signup user route')});

