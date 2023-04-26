const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    captain: {
        type: String,
        required: true,
    },
    numPlayers: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});
        
const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;