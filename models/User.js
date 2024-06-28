const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    //Need to look into validation for email
    email: { type: String, required: true, unique: true},
    cocktails: { type: Array, required: false },
    friends: { type: Array, required: false },
});

const User = mongoose.model('Username', userSchema);

module.exports = User;