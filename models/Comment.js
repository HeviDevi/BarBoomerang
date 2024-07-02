const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    username: {type: String, required: true},
    commentText: {
        type: String, 
        required: true,
        maxLength: 280, 
        minLength: 2
        },
    datePosted: {type: Date, default: Date.now},
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;