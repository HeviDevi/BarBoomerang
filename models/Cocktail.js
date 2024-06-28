const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    comments: { type: Array, required: false },
    datePosted: { type: Date, default: Date.now },
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;