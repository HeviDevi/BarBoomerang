const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    commentText: {type: String, required: true},
    datePosted: {type: Date, default: Date.now},
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;